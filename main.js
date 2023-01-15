
var courseName = document.getElementById("courseName");
var courseCat = document.getElementById("courseCat");
var coursePrice = document.getElementById("coursePrice");
var courseDesc = document.getElementById("courseDesc");
var data = document.getElementById("data");
var addBtn = document.getElementById("click");
var correntindex;

if (localStorage.getItem("coursesList") == null) {
    var courses = [];
} else {
    /* خذ اللوكال ستوريج وخزنها بالاريي اللي راح تنطبع بالصفحةوطبعا لاتنسى تحولها لاوبجيكت بالاول 
    coursesList >> اسم الوكال ستوريج
    JSON.parse >>  تقوم بتحويل الستوريج من نص لاوبجيكت 
    */
    courses = JSON.parse(localStorage.getItem("coursesList"));
    displayData();
}


addBtn.onclick = function () {
    if (addBtn.innerHTML == "Add course") {
        createData();
    } else {
        updateData();
        addBtn.innerHTML = "Add course";
    }

    displayData();
    clearData();

}



/*----------- create -------------------------------- */
function createData() {

    var course = {
        name: courseName.value,
        cat: courseCat.value,
        price: coursePrice.value,
        desc: courseDesc.value
    };

    /* ضيف الاوبجيكج الفلاني للاريه */
    courses.push(course);
    localStorage.setItem("coursesList", JSON.stringify(courses));
}

/* -----------displayData  --------------------------------- */
function displayData() {

    var result = " ";
    for (var i = 0; i < courses.length; i++) {
        result += `<tr>
       <td> ${i}</td>
       <td>${courses[i].name} </td>
       <td>${courses[i].cat} </td>
       <td> ${courses[i].price} </td>
       <td> ${courses[i].desc}</td>
       <td> <button  class="btn btn-info" onclick="GetData(${i})" >Update </button>
            <button  onclick="deleteData(${i})" class="btn btn-danger">Delete </button>
        </td>     
        </tr>`;
    }
    data.innerHTML = result;
}

/* -------clear --------------------------------- */
function clearData() {
    courseName.value = "";
    courseCat.value = "";
    coursePrice.value = "";
    courseDesc.value = "";
}

/* ----------- delete ---------------------------- */
function deleteData(index) {
    /*index = id   */
    courses.splice(index, 1);    /* روح عند الاندكس وامسح عنصر */

    /* هنا للتعديل عالستوريج لانه بدون التعديل راح يضل الداتا فيها لانه لما نحذف بنحذف من الارييه فقط لذلك بنحتاج نعدل بالستوريج مباشرة */
    localStorage.setItem("coursesList", JSON.stringify(courses));

    displayData();
}


/* delete all */
deleteBtn.onclick = function () {
    localStorage.removeItem("coursesList");
    courses = [];
    data.innerHTML = ""
}



function search(e) {

    var result = " ";
    for (var i = 0; i < courses.length; i++) {
        /* نستقبل العنصر من التاغ الموجود في 
        html
           ونضيف له include 
           ليبحث ان كان يحتوي عند كتافة كل حرف
           ونضيف toLowerCase()
           ليتغاضى عن اذا كانت الحروف كبيرة او صغيرة  */
        if (courses[i].name.toLowerCase().includes(e.toLowerCase())) {
            result += `<tr>
   <td> ${i}</td>
   <td>${courses[i].name} </td>
   <td>${courses[i].cat} </td>
   <td> ${courses[i].price} </td>
   <td> ${courses[i].desc}</td>
   <td> <button  class="btn btn-info" onclick="GetData(${i})" >update </button>
        <button  onclick="deleteData(${i})" class="btn btn-danger">Delete </button>
    </td>     
    </tr>`;
        }
    }
    data.innerHTML = result;
}

function GetData(index) {
    var course = courses[index];
    courseName.value = course.name;
    courseCat.value = course.cat;
    coursePrice.value = course.price;
    courseDesc.value = course.desc;
    addBtn.innerHTML = "Update course";
    correntindex = index;
}

function updateData() {
    var course = {
        name: courseName.value,
        cat: courseCat.value,
        price: coursePrice.value,
        desc: courseDesc.value
    };

    courses[correntindex].name = course.name;
    courses[correntindex].cat = course.cat;
    courses[correntindex].price = course.price;
    courses[correntindex].desc = course.desc;

    localStorage.setItem("coursesList", JSON.stringify(courses));


}

/* 
courseName.onkeyup = function () {

    var namePattern = /^[A-Z][a-z]{2,8}$/;
    if (namePattern.test(courseName.value)) {
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.setAttribute("disabled", "disabled");

    }

}

 */



