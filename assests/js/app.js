const moviecontainer = document.getElementById('moviecontainer')
const showbtn = document.getElementById('showbtn')
const backdrop = document.getElementById('backdrop')
const movieModel = document.getElementById('movieModel')
const close1 =[...document.querySelectorAll('.closebtn')]
const movie = document.getElementById('movie')
const MovieName = document.getElementById('MovieName')
const movieImg = document.getElementById('movieImg')
const movieDescription = document.getElementById('movieDescription')
const movieRating = document.getElementById('movieRating')
const addmovie = document.getElementById('addmovie')
const updatemovie = document.getElementById('updatemovie')

let movieArr = []

if(JSON.parse(localStorage.getItem('movieArr'))){
  movieArr = JSON.parse(localStorage.getItem('movieArr')) 
}


function snackbar(msg){
  Swal.fire({
    title : msg,
    icon : 'success',
    timer : 3000
  })
}

function badgecolor(rating){
  if(rating >=4){
    return 'badge-success'
  }else if(rating >=3){
    return 'badge-warning'
  }else{
    return 'badge-danger'
  }

}

function templating(arr){
  let result =``

  arr.forEach(ele =>{
      result +=`<div class="col-md-3" id='${ele.movieId}'>
				<div class="card moviecard">
					<div class="card-header d-flex justify-content-between align-items-center">
						<h2>${ele.movieName}</h2>
						<span class="badge ${badgecolor(ele.movieRating)}">${ele.movieRating}</span>
					</div>
					<div class="card-body">
						<figure>
							<img src=${ele.movieImg}
							 alt="${ele.movieName}"
							 title="${ele.movieName}">
							<figcaption>
								<h4>${ele.movieName}</h4>
								<p>${ele.movieDesciption}</p>
							</figcaption>
						</figure>
					</div>
					<div class="card-footer d-flex justify-content-between align-items-center">
						<button class="btn btn-sm ntflx-primary-btn" onclick='onedit(this)'>Edit</button>
						<button class="btn btn-sm ntflx-secondary-btn" onclick ='OnRemove(this)'>Remove</button>

			
					</div>
				</div>
			</div>`
  })

  moviecontainer.innerHTML = result
}

function onshowhandl(){

  backdrop.classList.toggle('active')
  movieModel.classList.toggle('active')
  movie.reset()

}


function onsubmithandl(ele){
  ele.preventDefault()

  let newmovie ={
    movieName : MovieName.value,
    movieImg : movieImg.value,
    movieDesciption : movieDescription.value,
    movieRating : movieRating.value,
    movieId : Date.now().toString()
    
  }

  movieArr.push(newmovie)

  localStorage.setItem('movieArr',JSON.stringify(movieArr))

  movie.reset()

 let div = document.createElement('div');
  div.className = 'col-md-3'
  div.id = newmovie.movieId

  div.innerHTML =`<div class="card moviecard">
					<div class="card-header d-flex justify-content-between align-items-center">
						<h2>${newmovie.movieName}</h2>
						<span class="badge ${badgecolor(newmovie.movieRating)}">${newmovie.movieRating}</span>
					</div>
					<div class="card-body">
						<figure>
							<img src=${newmovie.movieImg}
							 alt="${newmovie.movieName}"
							 title="${newmovie.movieName}">
							<figcaption>
								<h4>${newmovie.movieName}</h4>
								<p>${newmovie.movieDesciption}</p>
							</figcaption>
						</figure>
					</div>
					<div class="card-footer d-flex justify-content-between align-items-center">
						<button  class="btn btn-sm ntflx-primary-btn" onclick='onedit(this)'>Edit</button>
						<button class="btn btn-sm ntflx-secondary-btn" onclick ='OnRemove(this)'>Remove</button>

			
					</div>
				</div>`

  moviecontainer.append(div)

  onshowhandl();

  snackbar(`The New Movie Is Added Successfully!!!`)


}

function OnRemove(ele){
  let removeId = ele.closest('.col-md-3').id

  const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn ntflx-secondary-btn ml-2",
    cancelButton: "btn ntflx-primary-btn"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  let index = movieArr.findIndex(ele => ele.movieId == removeId )

  let removeObj = movieArr.splice(index,1)

  localStorage.setItem('movieArr',JSON.stringify(movieArr))


  ele.closest('.col-md-3').remove()

  snackbar(`The Movie Is Removed Successfully!!!`)

});

}

function onedit(ele){
  let editId = ele.closest('.col-md-3').id

  localStorage.setItem('editId',editId)

  let editObj = movieArr.find(ele => ele.movieId == editId)

  onshowhandl();

  MovieName.value = editObj.movieName
  movieImg.value = editObj.movieImg
  movieDescription.value = editObj.movieDesciption

  addmovie.classList.add('d-none')
  updatemovie.classList.remove('d-none')

}

function onupdatehandl(){
  let updateId = localStorage.getItem('editId')

  let updateObj ={
    movieName : MovieName.value,
    movieImg : movieImg.value,
    movieDesciption : movieDescription.value,
    movieRating : movieRating.value,
    movieId : updateId
  }

  let index = movieArr.findIndex(ele => ele.movieId == updateId)

  movieArr[index] = updateObj

  localStorage.setItem('movieArr',JSON.stringify(movieArr))


  movie.reset()
  let div = document.getElementById(updateId)

  let result =`<div class="card moviecard">
					      <div class="card-header d-flex justify-content-between align-items-center">
						      <h2>${updateObj.movieName}</h2>
						      <span class="badge ${badgecolor(updateObj.movieRating)}">${updateObj.movieRating}</span>
					      </div>
					      <div class="card-body">
					      	<figure>
						      	<img src=${updateObj.movieImg}
							       alt="${updateObj.movieName}"
							       title="${updateObj.movieName}">
							      <figcaption>
							      	<h4>${updateObj.movieName}</h4>
								      <p>${updateObj.movieDesciption}</p>
							      </figcaption>
						     </figure>
				        </div>
					      <div class="card-footer d-flex justify-content-between align-items-center">
						      <button  class="btn btn-sm ntflx-primary-btn" onclick='onedit(this)'>Edit</button>
						      <button class="btn btn-sm ntflx-secondary-btn" onclick ='OnRemove(this)'>Remove</button>

			
					      </div>
				      </div>`

  div.innerHTML =result;


  onshowhandl();


 addmovie.classList.remove('d-none')
 updatemovie.classList.add('d-none')

  snackbar(`The Movie Details are Updated Successfully!!!`)


}

templating(movieArr)
showbtn.addEventListener('click',onshowhandl)
close1.forEach(ele =>{
  ele.addEventListener('click',onshowhandl)
})

movie.addEventListener('submit',onsubmithandl)
updatemovie.addEventListener('click',onupdatehandl)

