const mongoose = require('mongoose');
const database = require('../config/database');
const Course = require('../models/Course');
const Category = require('../models/Category');
const Tag = require('../models/Tag');

async function migrate() {
  try {
    await database.connect();
    console.log('Connected for migration');

    const courses = await Course.find({}).lean().exec();
    console.log(`Found ${courses.length} courses`);

    for (const c of courses) {
      const updates = {};

      // Normalize category: if it's a non-object string, try to find or create a Category
      const categoryVal = c.category;
      if (categoryVal && typeof categoryVal === 'string' && !mongoose.Types.ObjectId.isValid(categoryVal)) {
        const slugOrName = categoryVal;
        let cat = await Category.findOne({ $or: [{ slug: slugOrName }, { name: slugOrName }] }).exec();
        if (!cat) {
          cat = await Category.create({ name: slugOrName, description: `Migrated category for ${slugOrName}`, slug: String(slugOrName).toLowerCase() });
          console.log(`Created Category '${slugOrName}' -> ${cat._id}`);
        } else {
          console.log(`Found Category for '${slugOrName}' -> ${cat._id}`);
        }
        updates.category = cat._id;
      }

      // Normalize tag: if it's an array of strings (or single string in some older docs)
      if (Array.isArray(c.tag) && c.tag.length > 0) {
        // if first element is a non-objectid string, use it to create/find Tag and set tag to single ObjectId
        const first = c.tag[0];
        if (typeof first === 'string' && !mongoose.Types.ObjectId.isValid(first)) {
          let tg = await Tag.findOne({ name: first }).exec();
          if (!tg) {
            tg = await Tag.create({ name: first });
            console.log(`Created Tag '${first}' -> ${tg._id}`);
          } else {
            console.log(`Found Tag '${first}' -> ${tg._id}`);
          }
          updates.tag = tg._id; // controller expects single tag ObjectId
        } else if (mongoose.Types.ObjectId.isValid(String(first))) {
          // it's already an ObjectId string - keep as single id
          updates.tag = new mongoose.Types.ObjectId(String(first));
        }
      } else if (typeof c.tag === 'string' && c.tag.length > 0 && !mongoose.Types.ObjectId.isValid(c.tag)) {
        // rare case: tag stored as string
        let tg = await Tag.findOne({ name: c.tag }).exec();
        if (!tg) {
          tg = await Tag.create({ name: c.tag });
          console.log(`Created Tag '${c.tag}' -> ${tg._id}`);
        }
        updates.tag = tg._id;
      }

      if (Object.keys(updates).length > 0) {
        await Course.findByIdAndUpdate(c._id, updates);
        console.log(`Updated Course ${c._id}:`, updates);
      }
    }

    console.log('Migration completed');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  }
}

migrate();
