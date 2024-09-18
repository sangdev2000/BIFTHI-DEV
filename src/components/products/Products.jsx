// import React from "react"
// import Back from "../common/Back"
// import RecentCard from "../home/recent/RecentCard"
// import "../home/recent/recent.css"
// import img from "../images/about.png"
// import { list } from "../data/Data"; // Import dữ liệu sản phẩm


// const Products = () => {
//   return (
//     <>
//       <section className='blog-out mb'>
//         <Back title='SẢN PHẨM' name='Home > Sản Phẩm' cover={img} />
//         <div class="filter-wrapper">
//   <div class="filter-container">
//     <div class="filter-item">
//       <i class="fas fa-map-marker-alt"></i>
//       <div>
//         <p class="filter-title">Loại phòng</p>
//         <input class="filter-description" placeholder="Tìm nội thất cho từng loại phòng"/>
//       </div>
//     </div>

//     <div class="filter-item">
//       <i class="fas fa-tag"></i>
//       <div>
//         <p class="filter-title">Giá cả</p>
//         <input class="filter-description" placeholder="Giá cả phù hợp"/>
//       </div>
//     </div>

//     <div class="search-bar">
//       <i class="fas fa-search"></i>
//       <input type="text" placeholder="Nhập tên loại nội thất" />
//     </div>
//   </div>
// </div>


//         <div className='container recent'>
//           <RecentCard />
//         </div>
//       </section>
//     </>
//   )
// }

// export default Products;

// import React, { useState } from "react";
// import Back from "../common/Back";
// import RecentCard from "../home/recent/RecentCard";
// import "../home/recent/recent.css";
// import img from "../images/about.png";
// import { list } from "../data/Data";

// const Products = () => {
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [minPrice, setMinPrice] = useState(""); 
//   const [maxPrice, setMaxPrice] = useState(""); 
//   const [nameFilter, setNameFilter] = useState("");

//   const parsePrice = (priceString) => {
//     return parseInt(priceString.replace(/[^0-9]/g, ""), 10);
//   };

//   const filteredProducts = list.filter((product) => {
//     const productPrice = parsePrice(product.price); 

    
//     const matchesCategory = categoryFilter
//       ? product.category.toLowerCase().includes(categoryFilter.toLowerCase())
//       : true;

//     const matchesPrice =
//       (minPrice ? productPrice >= parsePrice(minPrice) : true) &&
//       (maxPrice ? productPrice <= parsePrice(maxPrice) : true);

//     const matchesName = nameFilter
//       ? product.name.toLowerCase().includes(nameFilter.toLowerCase())
//       : true;

//     return matchesCategory && matchesPrice && matchesName;
//   });

//   return (
//     <>
//       <section className="blog-out mb">
//         <Back title="SẢN PHẨM" name="Home > Sản Phẩm" cover={img} />
//         <div className="filter-wrapper">
//           <div className="filter-container">
//             <div className="filter-item">
//               <i className="fas fa-map-marker-alt"></i>
//               <div>
//                 <p className="filter-title">Loại phòng</p>
//                 <input
//                   className="filter-description"
//                   placeholder="Tìm nội thất cho từng loại phòng"
//                   value={categoryFilter}
//                   onChange={(e) => setCategoryFilter(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="filter-item">
//               <i className="fas fa-tag"></i>
//               <div>
//                 <p className="filter-title">Giá thấp nhất</p>
//                 <input
//                   className="filter-description"
//                   placeholder="Hãy nhập giá"
//                   value={minPrice}
//                   onChange={(e) => setMinPrice(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="filter-item">
//               <i className="fas fa-tag"></i>
//               <div>
//                 <p className="filter-title">Giá tối đa</p>
//                 <input
//                   className="filter-description"
//                   placeholder="Hãy nhập giá"
//                   value={maxPrice}
//                   onChange={(e) => setMaxPrice(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="search-bar">
//               <i className="fas fa-search"></i>
//               <input
//               className="filter-description"
//                 placeholder="Nhập tên sản phẩm"
//                 value={nameFilter}
//                 onChange={(e) => setNameFilter(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="container recent">
//           <RecentCard products={filteredProducts} />
//         </div>
//       </section>
//     </>
//   );
// };

// export default Products;

import React, { useState } from "react";
import Back from "../common/Back";
import RecentCard from "../home/recent/RecentCard";
import "../home/recent/recent.css";
import img from "../images/about.png";
import { list } from "../data/Data"; // Import dữ liệu sản phẩm
import "./Product.css"; // Tạo file CSS riêng cho dropdown

const Products = () => {
  // State lưu trữ giá trị của các bộ lọc
  const [selectedCategories, setSelectedCategories] = useState([]); // Lưu trữ các danh mục được chọn
  const [minPrice, setMinPrice] = useState(""); // Giá min
  const [maxPrice, setMaxPrice] = useState(""); // Giá max
  const [nameFilter, setNameFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // State để hiển thị menu dropdown

  // Hàm để chuyển giá từ chuỗi về số
  const parsePrice = (priceString) => {
    return parseInt(priceString.replace(/[^0-9]/g, ""), 10);
  };

  // Hàm xử lý khi thay đổi checkbox
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Lấy tất cả các danh mục từ dữ liệu
  const allCategories = [...new Set(list.map((item) => item.category))];

  // Hàm lọc sản phẩm dựa trên bộ lọc
  const filteredProducts = list.filter((product) => {
    const productPrice = parsePrice(product.price); // Lấy giá sản phẩm dưới dạng số

    // Lọc theo category (Loại phòng)
    const matchesCategory = selectedCategories.length > 0
      ? selectedCategories.includes(product.category)
      : true;

    // Lọc theo khoảng giá
    const matchesPrice =
      (minPrice ? productPrice >= parsePrice(minPrice) : true) &&
      (maxPrice ? productPrice <= parsePrice(maxPrice) : true);

    // Lọc theo name (Tên sản phẩm)
    const matchesName = nameFilter
      ? product.name.toLowerCase().includes(nameFilter.toLowerCase())
      : true;

    return matchesCategory && matchesPrice && matchesName;
  });

  return (
    <>
      <section className="blog-out mb">
        <Back title="SẢN PHẨM" name="Home > Sản Phẩm" cover={img} />

        {/* Bộ lọc sản phẩm */}
        <div className="filter-wrapper">
          <div className="filter-container">
            {/* Lọc theo loại phòng */}
            <div className="filter-item dropdown">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <p
                  className="filter-title"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ cursor: "pointer" }}
                >
                  Danh mục
                  <i className={`fas ${showDropdown ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                </p>

                {/* Hiển thị dropdown khi nhấn vào */}
                {showDropdown && (
                  <div className="dropdown-content">
                    {allCategories.map((category, index) => (
                      <div key={index} className="dropdown-item">
                        <input
                          type="checkbox"
                          id={`category-${index}`}
                          value={category}
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <label htmlFor={`category-${index}`}>{category}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="filter-item">
              <i className="fas fa-tag"></i>
              <div>
                <p className="filter-title">Giá thấp nhất</p>
                <input
                  className="filter-description"
                  placeholder="Hãy nhập giá"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)} // Cập nhật giá trị lọc theo giá min
                />
              </div>
            </div>

            <div className="filter-item">
              <i className="fas fa-tag"></i>
              <div>
                <p className="filter-title">Giá tối đa</p>
                <input
                  className="filter-description"
                  placeholder="Hãy nhập giá"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)} // Cập nhật giá trị lọc theo giá max
                />
              </div>
            </div>

            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input
                className="filter-description"
                placeholder="Tên sản phảm"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)} // Cập nhật giá trị lọc theo tên
              />
            </div>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="container recent">
          <RecentCard products={filteredProducts} />
        </div>
      </section>
    </>
  );
};

export default Products;

