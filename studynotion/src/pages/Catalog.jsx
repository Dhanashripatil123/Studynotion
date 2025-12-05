import React, { useEffect, useState } from "react"
import FooterLinks2 from "../components/FooterLink2"
import { useParams } from "react-router-dom"
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import getCategoriesPageData from "../services/operations/pageAndComponenetID"
import Course_Card from  "../components/core/catalog/Course_Card"
import CourseSlider from '../components/core/catalog/CourseSlider'

const Catalog = () => {
			const {catalogName} = useParams();
			const [catalogPageData,setCatalogPageData] = useState(null);
			const [categoryId,setCategoryId] = useState('');

			// fetch all categories and resolve categoryId; if not found, fall back to catalogName string
			useEffect(()=>{
					const getCategories = async()=>{
							try{
								const res = await apiConnector('GET',categories.SHOW_ALL_CATEGORIES);
								const list = res?.data?.data || [];
								const canonical = (str) => String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
								const normalized = canonical(catalogName);
								const matched = list.find((ct) => (canonical(ct?.name) === normalized || canonical(ct?.slug) === normalized));
								// store _id if found, otherwise pass the catalogName string (server will resolve slug/name)
								setCategoryId(matched?._id || (catalogName || ''));
							}catch(err){
								console.error('Failed to load categories', err);
								setCategoryId(catalogName || '');
							}
						}
					getCategories();
			},[catalogName])

			useEffect(()=>{
				const getCategoryDetails = async()=>{
					 if(!categoryId) return;
					 try{
								const res = await getCategoriesPageData(categoryId);
								setCatalogPageData(res)
					 } catch(err){
									 console.log(err);
					 }
					}
				getCategoryDetails()
			},[categoryId]);

		 return (
		 		 <div className="text-white bg-slate-900 min-h-screen">
		 			 <div className="max-w-6xl mx-auto px-4 py-8">
					 {/* Breadcrumb & Title */}
					 <div className="text-sm text-gray-400 mb-3">
						 Home / <span className="text-gray-200">Catalog</span> / <span className="text-indigo-300">{catalogPageData?.data?.selectedCategory?.name || catalogName}</span>
					 </div>

			 			 <header className="mb-6">
			 				 <h1 className="text-3xl font-semibold text-white">{catalogPageData?.data?.selectedCategory?.name || catalogName}</h1>
			 				 <p className="mt-2 text-gray-300 max-w-3xl">{catalogPageData?.data?.selectedCategory?.description || 'Explore courses and learning paths.'}</p>
			 			 </header>

					 {/* Filters / Chips */}
		 			{/* Filters / Chips */}
		 			<div className="flex flex-wrap gap-3 items-center mt-4 mb-8">
		 				 <button className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">Most Popular</button>
		 				 <button className="px-3 py-1 bg-transparent border border-gray-700 text-gray-200 rounded-full text-sm">Newest</button>
		 				 <button className="px-3 py-1 bg-transparent border border-gray-700 text-gray-200 rounded-full text-sm">Highest Rated</button>
		 				 <div className="ml-auto text-sm text-gray-400">{(catalogPageData?.data?.selectedCategory?.courses?.length || 0)} courses</div>
		 			</div>

					 {/* Hero Slider */}
					 <section className="mb-10">
						 <h2 className="text-xl font-semibold mb-4">Course to get you started</h2>
						 <div className="bg-[#071226] rounded-lg p-4">
							 <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
						 </div>
					 </section>

					 {/* Top Courses in this category */}
					 <section className="mb-10">
						 <h2 className="text-xl font-semibold mb-4">Top Courses in this category</h2>
						 <div className="bg-[#071226] rounded-lg p-4">
							 <CourseSlider Courses={catalogPageData?.data?.differentcategories?.courses} />
						 </div>
					 </section>

					 {/* Frequently bought / Grid */}
					 <section className="mb-12">
						 <h2 className="text-xl font-semibold mb-4">Frequently Bought</h2>
						 <div className="py-4">
							 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
								 {(catalogPageData?.data?.topsellingcourse || []).slice(0,6).map((course, index) => (
									 <div key={index} className="bg-[#071226] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
										 <Course_Card course={course} Height={"h-[320px]"} />
									 </div>
								 ))}
							 </div>
						 </div>
					 </section>

					 <FooterLinks2 />
				 </div>
			 </div>
		 )
}

export default Catalog