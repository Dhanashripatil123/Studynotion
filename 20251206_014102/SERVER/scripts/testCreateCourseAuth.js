const mongoose = require('mongoose');
const database = require('../config/database');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fetch = (...args) => import('node-fetch').then(({default:fetch})=>fetch(...args));

async function run(){
  try{
    await database.connect();
    console.log('DB Connected for test');
    const instructor = await User.findOne({ accountType: 'Instructor' }).lean().exec();
    if(!instructor){
      console.error('No Instructor user found in DB');
      process.exit(1);
    }
    console.log('Found instructor:', instructor._id.toString(), instructor.email);
    const tokenPayload = { id: instructor._id.toString(), accountType: instructor.accountType, email: instructor.email };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET || 'dhanashri', { expiresIn: '1h' });
    console.log('Generated token:', token.slice(0,20) + '...');

    const uniqueName = `python-e2e-${Date.now()}`;
    const res = await fetch('http://localhost:4000/api/v1/course/createCourse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        courseName: uniqueName,
        courseDescription: 'test create by script',
        whatYouWillLearn: 'testing',
        price: '123',
        category: 'student',
        tag: 'automation'
      })
    });

    const body = await res.text();
    console.log('Response status:', res.status);
    console.log('Response body:', body);
    process.exit(0);
  }catch(err){
    console.error('Test failed', err);
    process.exit(1);
  }
}

run();
