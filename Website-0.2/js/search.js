'use strict';

/*
    Wishlist:
    -change feature from strings to enum
    -image in result can be changed into array, and <img> into carousel
    -cache by page
*/

const houseData = 
            [{
              id: "house1",
              img:"house1.jpg",
              typeOfHouse:"PRIVATE ROOM IN APARTMENT",
              postTitle: "Private room in apartment\
                            New Cozy Suite *5 mins walk to North Point MTR",
              price: 332,
              features: ["2 guests", "Studio", "1 bed", "1 private bath"],
            },
            {
              id: "house2",
              img:"house2.jpg",
              typeOfHouse:"SHARED ROOM IN APARTMENT",
              postTitle: "Comfort Homey Quiet Stay",
              price: 310,
              features: ["2 guests", "1 bedroom", "1 bed", "2 shared baths", "Wifi", "Kitchen"],
            },
            { 
              id: "house3",
              img:"house3.jpg",
              typeOfHouse:"PRIVATE ROOM IN APARTMENT",
              postTitle: "Stanley. Heaven at 40min of Causeway Bay",
              price: 450,
              features: ["2 guests", "1 bedroom", "1 private bath", "Wifi", "Kitchen"],
            },
        ];

class Main extends React.Component {
    render() {
        const listOfHouse = houseData.map((val) => {
                var id= "result-" + val.id;
                var features = val.features.map((feature) => {
                   return (
                    <span key={feature}>- {feature} -</span>
                   ) 
                });
            
                var price = "$" + val.price + " HKD per night";
                return (
                    <div className="row border mb-3 house-result" key={id} id={id}>
                        <div className="col-3 border-right h-100">
                            <img src={val.img}/>
                        </div>
                        <div className="col-7 border-right h-100 ">
                            <p className="font-weight-bold mb-1"> {val.typeOfHouse} </p>
                            <p className="mb-1"> {val.postTitle} </p>
                            <p className="font-weight-light h6">
                                {features}
                            </p>
                        </div>
                        <div className="col-2 h-100">
                            <p>{price}</p>
                        </div>
                    </div>
                );
            });
        
       return (
           <div className="container-fluid p-3">
                {listOfHouse}
           </div>
       )  
    };
}

ReactDOM.render(
  <Main />,
  document.getElementById('result')
);