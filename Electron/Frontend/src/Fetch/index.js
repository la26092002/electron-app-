import { URL } from "../constants/Constants";
const AddCategory = (name) =>{
    fetch(`${URL}/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name }) 
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create category');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Output: { message: "Category Created" }
      })
      .catch(error => {
        console.error(error); // Handle error
      });
}

export { AddCategory };