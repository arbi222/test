document.getElementById("input-file").addEventListener("change", function(){

    var fileReader = new FileReader();

    fileReader.readAsText(this.files[0]);

    var loaderWaiting = document.getElementsByClassName("lds-ring")[0];
    loaderWaiting.style.display = "block";

    fileReader.onload = function(){
        
        var text = fileReader.result;

        var tableRow = document.getElementById("output");
        
        var counter = 0;

        // spliting all text in the file into lines
        text.split('\n').map(function (el) {  
            counter++; // counting the lines
            
            var td = document.createElement('td');
            var txt = document.createTextNode(counter + ") " + // creating the format
            el.split(",")[0] + " " + el.split(",")[1] + " | " +
            el.split(",")[2] + "," + el.split(",")[3] + "," +
            el.split(",")[4] + " | " + el.split(",")[5] + " | " + el.split(",")[6]);
            td.appendChild(txt);
            tableRow.appendChild(td);
        });

       
        function filterFunction() {

            var input = document.getElementById("filter");
            var filter = input.value.toLowerCase(); // the word we wanna filter

            var tr = document.getElementById("output");
            var td = tr.getElementsByTagName("td");

            //creating txtarray to store firstname, lastname, street and city for all lines
            var txtArray = [] 

            text.split("\n").map(function(el){
                txtArray.push(el.split(",")[0] + " " + el.split(",")[1]); // firstname + lastname
                txtArray.push(el.split(",")[2]); // street
                txtArray.push(el.split(",")[3]); // city
            })

            var allowFiltering = false;

            txtArray.forEach(function(item){
                if (item.toLowerCase().includes(filter)){
                    allowFiltering = true;
                }
            })
            
    
            for (var i = 0; i < td.length; i++) {
                
               var txtValue = td[i].textContent || td[i].innerText;
                
               if (allowFiltering){
                    document.getElementById("message").style.display = "none";
                    if (txtValue.toLowerCase().indexOf(filter) > -1) {
                        td[i].style.display = "";
                    } else {
                        td[i].style.display = "none";
                    }
               }
               else{ // allowfiltering = false, which means the word we are filtering is not the txtarray
                 document.getElementById("message").style.display = "block"; // showing message
                 td[i].style.display = "none"; // also we hide all the data
               }
                
            }
        }

        document.getElementById("filter").addEventListener("keyup", filterFunction)
        
        

        var resultsContainer = document.getElementsByClassName("results-container")[0];
        resultsContainer.style.display = "block";

        var loader = document.getElementsByClassName("lds-ring")[0];
        loader.style.display = "none"; // removing loader after we have showed the data

        var mainContainer = document.getElementsByClassName("main-container")[0];
        mainContainer.style.maxHeight = "600px";
        
    }

    document.getElementById("input-file").addEventListener("click", function(){
        location.reload();
    })

})
