// sendMail Method for sending mails by emailjs
const sendMail = async (ID) => {
  var form_data = {
    // accessing  user form data
    full_name: document.getElementById(`full_name_${ID}`).value,
    email_address: document.getElementById(`email_address_${ID}`).value,
    phone_number: document.getElementById(`phone_number_${ID}`).value,
    delivery_address: document.getElementById(`delivery_address_${ID}`).value,
    offer_amount: document.getElementById(`offer_amount_${ID}`).value,

    // accessing selected cattle data
    cattle_id: document.getElementById(`cattle_id_${ID}`).value,
    cattle_title: document.getElementById(`cattle_title_${ID}`).value,
    cattle_age: document.getElementById(`cattle_age_${ID}`).value,
    cattle_weight: document.getElementById(`cattle_weight_${ID}`).value,
    cattle_gender: document.getElementById(`cattle_gender_${ID}`).value,
    cattle_price: document.getElementById(`cattle_price_${ID}`).value,
    cattle_status: document.getElementById(`cattle_status_${ID}`).value,
  };
  const serviceID = "service_nn33naa";
  const templateID = "template_s50nwq5";
  try {
    const res = await emailjs.send(serviceID, templateID, form_data);
    const sendButton = document.getElementById(`btn-user-from${ID}`);
    if ((sendButton.disabled = true)) {
      var modalMsgSuccess = new bootstrap.Modal(
        document.getElementById("modal_msg_success"),
        {}
      );
      const btnRoute = document.getElementsByClassName("route_to_index");
      const modalStyle = document.getElementsByClassName("modal-style");
      modalStyle[0].style.height = "100vh";
      modalStyle[0].style.display = "flex";
      modalStyle[0].style.alignItems = "center";
      modalStyle[0].style.zIndex="10000";
      btnRoute[0].addEventListener("click", () => {
        window.location.reload("./index.html");
      });
      modalMsgSuccess.show();
      document.body.addEventListener("click", () => {
        window.location.reload("./index.html");
      });
    }
    // console.log(res);
  } 
  catch (failed_error) {
    const sendButton = document.getElementById(`btn-user-from${ID}`);
    if ((sendButton.disabled = true)) {
      var modalMsgFailed = new bootstrap.Modal(
        document.getElementById("modal_msg_failed"),
        {}
      );
      const btnRoute = document.getElementsByClassName("route_to_index");
      const modalStyle = document.getElementsByClassName("modal-style");
      modalStyle[1].style.height = "100vh";
      modalStyle[1].style.display = "flex";
      modalStyle[1].style.alignItems = "center";
      modalStyle[1].style.zIndex="10000";
      btnRoute[1].addEventListener("click", () => {
        window.location.reload("./index.html");
      });
      modalMsgFailed.show();
      document.body.addEventListener("click", () => {
        window.location.reload("./index.html");
      });
    }
  }
};

const cattle_infromation_section = async () => {
  const cattleData = await fetch("./js/data.json");
  const cattleInfo = await cattleData.json();
  const cattleInfoRow = document.getElementById("cattle-info-row");
  const cattleInfoSectionDiv = document.getElementById("cattle-info-section");
  const cattleImgSliderDiv = document.getElementById("cattle-img-slider-div");
  const cattleDetailsCardDiv = document.getElementById(
    "cattle-details-card-div"
  );
  // Generate unique IDs for each slider
  const sliderNavId = "sliderNav" + Math.round(Math.random() * 100);
  const sliderMainId = "sliderMain" + Math.round(Math.random() * 100);

  cattleInfo.map((cattle) => {
    //       //Map for Slider Div
    //       const { img_array } = cattle;
    //       const sliderNavId = "sliderNav" + Math.round(Math.random() * 100);
    //       const sliderMainId = "sliderMain" + Math.round(Math.random() * 100);
    //       const createSlider = document.createElement("div");
    //       createSlider.classList = [
    //         "col-lg-7 col-xl-7 col-xxl-7 col-md-7 col-sm-12 col-12 align-self-center mt-5",
    //       ];
    //       createSlider.innerHTML = `
    //     <div class="swiper_slider_container">
    //     <div class="swiper mySwiper2" id="${sliderMainId}">
    //       <div class="swiper-wrapper">
    //         ${img_array
    //           .map((img) => {
    //             return `<div class="swiper-slide">
    //                       <img src="${img}" class="img-fluid img-responsive" />
    //                     </div>`;
    //           })
    //           .join("")}
    //       </div>
    //       <div class="swiper-button-next"></div>
    //       <div class="swiper-button-prev"></div>
    //     </div>
    //     <div class="swiper mySwiper" id="${sliderNavId}">
    //       <div class="swiper-wrapper">
    //         ${img_array
    //           .map((img) => {
    //             return `<div class="swiper-slide">
    //                       <img src="${img}" class="img-fluid img-responsive"/>
    //                     </div>`;
    //           })
    //           .join("")}
    //       </div>
    //     </div>
    //   </div>
    // `;

    //       cattleInfoRow.appendChild(createSlider);
    //       // Initialize Swiper instances
    //       new Swiper(`#${sliderMainId}`, {
    //         loop: true,
    //         spaceBetween: 10,
    //         navigation: {
    //           nextEl: `#${sliderMainId} .swiper-button-next`,
    //           prevEl: `#${sliderMainId} .swiper-button-prev`,
    //         },
    //         thumbs: {
    //           swiper: `#${sliderNavId}`,
    //         },
    //       });

    //       new Swiper(`#${sliderNavId}`, {
    //         loop: true,
    //         spaceBetween: 10,
    //         slidesPerView: 4,
    //         freeMode: true,
    //         watchSlidesProgress: true,
    //         watchSlidesVisibility: true,
    //         breakpoints: {
    //           640: {
    //             slidesPerView: 2,
    //           },
    //           768: {
    //             slidesPerView: 3,
    //           },
    //           1024: {
    //             slidesPerView: 4,
    //           },
    //         },
    //       });

    //  Cattle Image Column Div
    const { img_url, status } = cattle;
    const colCattleImgDiv = document.createElement("div");
    colCattleImgDiv.classList = [
      "col-lg-6 col-xl-6 col-md-6 col-sm-6 col-12 align-self-center mt-5 mx-auto position-relative",
    ];
    colCattleImgDiv.innerHTML = `
  <div class="cattle-img-section d-flex flex-wrap justify-content-center">
    ${
      status === "Deactivated"
        ? `<h4><span class="badge bg-danger position-absolute" style="z-index:1;">Sold Out</span></h4>
            <img src="${img_url}" class="img-fluid img-responsive img-width-height" style="filter:opacity(0.5)"/>
            
        `
        : `<img src="${img_url}" class="img-fluid img-responsive img-width-height"/>
        
        `
    }
  </div>
`;

    cattleInfoRow.appendChild(colCattleImgDiv);
    colCattleImgDiv.innerHTML;
    const {
      id,
      age,
      weight,
      birth,
      region,
      gender,
      price,
      cattle_status,
      title,
    } = cattle;
    const colCattleInfoCardDiv = document.createElement("div");
    colCattleInfoCardDiv.classList = [
      "col-lg-6 col-xl-6 col-xxl-6 col-md-6 col-sm-12 col-12",
    ];
    colCattleInfoCardDiv.innerHTML = `
      <div class="price ps-md-5 d-flex w-50 justify-content-center ms-md-5">
      <h4>Rs.${price}</h4>
    </div>
    <div class="card d-grid mx-auto" style="width:24rem">
      <div class="card-header bg-dark text-white-50">
        <h4 class="card-title">
          Cattle Information  
        </h4>
      </div>
      <div class="card-body py-3">
    <div class="clearfix py-2">
        <span class="float-start">Title: </span>
        <span class="float-end">${title}</span>
    </div>
    <div class="clearfix py-2">
        <span class="float-start">Age: </span>
        <span class="float-end">${age}</span>
     </div>
       <div class="clearfix py-2">
        <span class="float-start">Weight: </span>
        <span class="float-end">${weight}</span>
     </div>
    <div class="clearfix py-2 border border-2 border-bottom-2 border-top-0 border-start-0 border-end-0 border-warning">
        <span class="float-start">Gender: </span>
        <span class="float-end">${gender}</span>
     </div>
     <!-- Modal Form Start -->
     <div
       class="modal fade cattle_modal"
       id="cattle_form${id}"
       tabindex="-1"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
     >
       <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">
               Make an offer
             </h5>
             <button
               type="button"
               class="btn-close"
               data-bs-dismiss="modal"
               aria-label="Close"
             ></button>
           </div>
           <div class="modal-body">
             <div class="mb-3">
               <label class="form-label">Full Name </label>
               <input
                 type="text"
                 name="name"
                 class="form-control"
                 placeholder="Enter full name"
                 id="full_name_${id}"
                 oninput="enableSendButton(${id})"
               />
             </div>
             <div class="mb-3">
               <label class="form-label">Email Address</label>
               <input
                 type="email"
                 name="email"
                 class="form-control"
                 placeholder="Enter email address"
                 id="email_address_${id}"
                 oninput="enableSendButton(${id})"
               />
             </div>
             <div class="mb-3">
               <label class="form-label">Phone Number</label>
               <input
                 type="text"
                 name="phone"
                 class="form-control"
                 placeholder="Enter phone number"
                 id="phone_number_${id}"
                 oninput="enableSendButton(${id})"
               />
             </div>
             <div class="mb-3">
               <label class="form-label">Delivery Address </label>
               <input
                 type="text"
                 name="delivery"
                 class="form-control"
                 placeholder="Enter delivery address"
                 id="delivery_address_${id}"
                 oninput="enableSendButton(${id})"
               />
             </div>
             <div class="mb-3">
               <label class="form-label">Offer Amount </label>
               <input
                 type="text"
                 name="offer"
                 class="form-control"
                 placeholder="Enter offer amount"
                 id="offer_amount_${id}"
                 oninput="enableSendButton(${id})"
               />
             </div>
           </div>
           <!-- Cattle info -->
           <div class="mb-3 px-4 d-none row">
             <div class="col-12">
               <h4>Selected Cattle Information:</h4>
             </div>
             <div class="col-4 pb-1">
               <input
                 type="text"
                 class="form-control"
                 readonly
                 id="cattle_id_${id}"
                 name="cattle-id"
                 value="${id}"
               />
             </div>
             <div class="col-4 pb-1">
               <input
                 type="text"
                 class="form-control"
                 readonly
                 id="cattle_title_${id}"
                 name="cattle-title"
                 value="${title}"
               />
             </div>
             <div class="col-4 pb-1">
               <input
                 type="text"
                 class="form-control"
                 readonly
                 id="cattle_age_${id}"
                 name="cattle-age"
                 value="${age}"
               />
             </div>
             <div class="col-4 pb-1">
               <input
                 type="text"
                 class="form-control"
                 readonly
                 id="cattle_weight_${id}"
                 name="cattle-weight"
                 value="${weight}"
               />
             </div>
             <div class="col-4 pb-1">
               <input
                 type="text"
                 class="form-control"
                 readonly
                 id="cattle_gender_${id}"
                 name="cattle-gender"
                 value="${gender}"
               />
             </div>
             <div class="col-4 pb-1">
               <input
                 type="text"
                 class="form-control"
                 readonly
                 id="cattle_price_${id}"
                 name="cattle-price"
                 value="${price}"
               />
             </div>
             <div class="col-4 pb-1">
               <input
                 type="text"
                 class="form-control d-none"
                 id="cattle_status_${id}"
                 readonly
                 name="cattle-status"
                 value="${status}"
               />
             </div>
           </div>
           <div class="modal-footer">
             <div class="d-grid py-2 w-100">
               <button
                 type="submit"
                 value="submit"
                 disabled
                 id="btn-user-from${id}"
                 onclick="sendMail(${id})"
                 class="btn btn-block btn-warning btn-modal-disable"
               >
                 Send
                 <i class="fa-solid fa-paper-plane" style="color: #000"></i>
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
     <!-- Form Submission Messages Start -->
     <div class="form_submission_msgs">
      <!-- Modal Success Msg Start -->
      <div class="modal fade modal-style" id="modal_msg_success">
        <div class="modal-dialog modal-sm text-success">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Thank You!</h4>
            </div>
      
            <!-- Modal body -->
            <div class="modal-body">
              <p class="text-break m-0">Your response has been submitted, seller will contact you shortly.</p>
              <p class="text-center display-3"><i class="fa-solid fa-clipboard-check"></i></p>
            </div> 
            <!-- Modal footer -->
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-success route_to_index"
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
      </div>
    </div>
    <!-- Modal Success Msg End -->
            <!-- Modal Failed Msg Start -->
            <div class="modal fade modal-style" id="modal_msg_failed">
              <div class="modal-dialog modal-sm text-danger">
                <div class="modal-content">
                  <!-- Modal Header -->
                  <div class="modal-header">
                    <h4 class="modal-title">Sorry for inconvenience!</h4>
                  </div>
                  <!-- Modal body -->
                  <div class="modal-body">
                    <p class="text-break m-0">Your response is not submitted, please try again or check your internet connection.</p>
                    <p class="text-center display-3"><i class="fa-solid fa-face-frown-open"></i></p>
                  </div>
                  <!-- Modal footer -->
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-danger route_to_index"
                      data-bs-dismiss="modal"
                    >
                      OK
                    </button>
                  </div>
                </div>
            </div>
          </div>
          <!-- Modal Failed Msg End -->
     </div>
     <!-- Form Submission Messages End -->
     <!-- Modal Form End  -->

  
    <h4 class="card-title pt-3 ">Seller Details</h4>
    <div class="clearfix py-2">
      <span class="float-start">Seller:</span>
      <span class="float-end">Zaman Cattle Farm</span>
    </div>
    <div class="clearfix py-2 border border-2 border-bottom-2 border-top-0 border-start-0 border-end-0 border-warning">
      <span class="float-start">Listing Location:</span>
      <span class="float-end">Korangi, Karachi</span>
    </div>
    <h4 class="card-title pt-3"> Transportation & Delivery</h4>
    <div class="clearfix py-2 border border-2 border-bottom-2 border-top-0 border-start-0 border-end-0 border-warning">
      <span class="float-start p-md-2" style="background:#ccc">Transportation Responsibility</span>
      <span class="float-end ">Seller</span>
    </div>
    ${
      status === "Deactivated"
        ? `<div class="clearfix pt-2">
      <p class="fw-bold py-1">
      To get similar options, please share your details by clicking the button below and seller will contact you shortly
      </p>
       <div class="d-grid">
        <button type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#cattle_form${id}" 
          id="btn-make-offer">Interested in Similar Cattle</button>
      </div>
      </div>`
        : `<div class="clearfix pt-2">
      <p class="fw-bold py-1">
      To get more information please make your offer and seller will contact you shortly
      </p>
       <div class="d-grid">
        <button type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#cattle_form${id}" 
          id="btn-make-offer">Make an Offer</button>
      </div>
      </div>`
    }
    </div>
      </div>
    </div>
      `;
    cattleInfoRow.appendChild(colCattleInfoCardDiv);
    const gapColDiv = document.createElement("div");
    gapColDiv.classList = ["col-lg-12 col-md-12 py-5"];
    gapColDiv.innerHTML = `
        <div class="border border-2 border-warning rounded-circle"></div>
      `;
    cattleInfoRow.appendChild(gapColDiv);
  });
  // Map for Section Creation
  // cattleInfo.map((cattle,index)=>{
  //   // cattle_section.innerHTML="";
  //   const {age, weight, birth, region, gender, price, cattle_status, img_array} = cattle;

  // // // Main Container Div
  // //   const containerDiv = document.createElement("div");
  // //   containerDiv.classList = ['container my-3'];

  // // // Main Row Div
  // //   const rowDiv = document.createElement("div");
  // //   rowDiv.classList = ['row justify-content-between pb-3 border border-secondary border-top-0 border-start-0 border-end-0 border-bottom-2']

  // // // Slider Column Div
  // //   const colCattleSliderDiv= document.createElement("div");
  // //   colCattleSliderDiv.classList=['col-lg-6'];

  // // Cattle Information Column Div
  //   const colCattleInfoCardDiv= document.createElement("div");
  //   colCattleInfoCardDiv.classList=['col-lg-2 col-xl-2 col-xxl-2 col-12']
  //   colCattleInfoCardDiv.innerHTML=`
  //   <div class="price" style="margin-left:130px">
  //   <h4>Rs.${price}</h4>
  // </div>
  // <div class="card d-grid mx-auto" style="width:24rem">
  //   <div class="card-header">
  //     <h4 class="card-title">
  //       Cattle Information
  //     </h4>
  //   </div>
  //   <div class="card-body">
  //   <h4><span class="badge bg-secondary">${cattle_status[0]}</span></h4>
  //   <div class="clearfix">
  //     <span class="float-start">Age: </span>
  //     <span class="float-end">${age}</span>
  //  </div>
  //    <div class="clearfix">
  //     <span class="float-start">Weight: </span>
  //     <span class="float-end">${weight}</span>
  //  </div>
  //      <div class="clearfix">
  //     <span class="float-start">Birth: </span>
  //     <span class="float-end">${birth}</span>
  //  </div>
  //      <div class="clearfix">
  //     <span class="float-start">Region: </span>
  //     <span class="float-end">${region}</span>
  //  </div>
  //      <div class="clearfix">
  //     <span class="float-start">Gender: </span>
  //     <span class="float-end">${gender}</span>
  //  </div>
  //  <div class="d-grid">
  //   <button class="btn btn-warning" id="btn-make-offer">Make an Offer</button>
  // </div>
  // <h4 class="card-title pt-3">Seller Details</h4>
  // <div class="clearfix">
  //   <span class="float-start">Seller:</span>
  //   <span class="float-end">Zaman</span>
  // </div>
  // <div class="clearfix">
  //   <span class="float-start">Seller Contact:</span>
  //   <span class="float-end" tel="+(92)348-4681741">+(92)348-4681741</span>
  // </div>
  // <div class="clearfix">
  //   <span class="float-start">Location:</span>
  //   <span class="float-end">Korangi Karachi</span>
  // </div>
  // <h4 class="card-title pt-3"> Transportation & Delivery</h4>
  // <div class="clearfix">
  //   <span class="float-start bg-secondary">Transportation Responsibility</span>
  //   <span class="float-end">Buyer</span>
  // </div>
  // </div>
  //   </div>
  // </div>

  //   `;

  //   cattleInfoRow.appendChild(colCattleInfoCardDiv);
  //   // cattleInfoSectionDiv.appendChild(containerDiv);
  //   // containerDiv.appendChild(rowDiv);
  //   // rowDiv.appendChild(colCattleSliderDiv);
  //   // rowDiv.appendChild(colCattleInfoCardDiv);

  //   });
};
cattle_infromation_section();


const myEmailJS = async () => {
  emailjs.init("gD2q1thlOyn2WSyAO");
};
myEmailJS();

// Validation fields
const enableSendButton = (id) => {
  const fullName = document.getElementById(`full_name_${id}`).value;
  const emailAddress = document.getElementById(
    `email_address_${id}`
  ).value;
  const phoneNumber = document.getElementById(`phone_number_${id}`).value;
  const deliveryAddress = document.getElementById(
    `delivery_address_${id}`
  ).value;
  const offerAmount = document.getElementById(`offer_amount_${id}`).value;
  const sendButton = document.getElementById(`btn-user-from${id}`);
  if (
    fullName !== "" &&
    emailAddress !== "" &&
    phoneNumber !== "" &&
    deliveryAddress !== "" &&
    offerAmount !== ""
  ) {
    sendButton.disabled = false;
  } else {
    sendButton.disabled = true;
  }
};
