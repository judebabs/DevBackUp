app.controller("MyController", function($scope)
	{
 $scope.article = "Doing some recap on AngularJS";	
});

app.controller("AnotherControllerOfMine", function ($scope) {

    //Consume a backend service that will provide data using asp.net web API
    var mockData = [];
    mockData.push({ name: 'Jude', email: 'judeb@gmail.com', phone: '07933523641', role: 'Software Consultant', department: 'First Digital', office: 'Durban', manager: 'Gabriel M', gender: 'Male' });
    mockData.push({ name: 'Anny Benett', email: 'Annyb@gmail.com', phone: '07933523641', role: 'Human Resources', department: 'First Technology', office: 'Johannesburg', manager: 'Olivier L', gender: 'Female' });
    mockData.push({ name: 'Peter de Jong', email: 'peit@gmail.com', phone: '07933523641', role: 'Team Lead Development', department: 'First Digital', office: 'Durban', manager: 'Joak S', gender: 'Male' });
    mockData.push({ name: 'Chamir Bodasing', email: 'chamir@gmail.com', phone: '07933523641', role: 'Software Consultant', department: 'First Digital', office: 'Johannesburg', manager: 'Gabriel M', gender: 'Male' });
    mockData.push({ name: 'Aline Marthe', email: 'judeb@gmail.com', phone: '07933523641', role: 'Senior Sales Manager', department: 'FirstNet', office: 'Cape Town', manager: 'Olivier La', gender:'Female' });
    
    $scope.contactsList = mockData;

});





app.controller("mealController", ['$scope', 'mealFactory', function ($scope, mealFactory) {

    $scope.status = 'loading data';
    $scope.meals = [];
    var meals = [];

    //function to get all meals 
    //function getAllMeals() {
    //    mealFactory.getAllMeals()
    //        .success(function (meals) {
    //            $scope.meals = meals;
    //            if (meals != null) {
    //                for (var count = 0; count < meals.length; count ++) {
    //                    console.log(meals[count].name);
    //                }
    //            }
    //        })
    //        .error(function (error) {
    //            $scope.status = "We having a problem " + error.message;
    //        });
    //}
    meals = mealFactory.getAllMeals();
    if (meals != null) {

        $scope.meals = meals;
    }
   


}]);

app.controller("chronicleController", ['$scope', 'chronicleFactory', function ($scope, chronicleFactory) {

    $scope.status = 'loading data';
    $scope.pages = [];
    $scope.chronicles =[];
    var pages = [];
    var chronicleresult =[];
    $scope.chroniclesdataList =[];
    var chronicledatalist = [];
    
    var chronicle1 = {name:'CHRONIC 2010' , sections:10, id:'1'};
    var chronicle2 = {name:'CHRONIC 2011' , sections:7,  id:'2'};
    var chronicle3 = {name:'CHRONIC 2012' , sections:15, id:'3'};
    var chronicle4 = {name:'CHRONIC 2013' , sections:5,  id:'4'};
    //Fake data again 
    //chronicledatalist.push(chronicle1);
    //chronicledatalist.push(chronicle2);
    //chronicledatalist.push(chronicle3);
    //chronicledatalist.push(chronicle4);
    
  
       
    getAllChroniclePages();
    
     function getAllChroniclePages() {
        chronicleFactory.getChroniclePages()
            .success(function (chroniclepages) {
                
             
                 chronicleresult= chroniclepages;
                if(chronicleresult.length>0)
                {
                    //Testing puposes
                    $scope.pages = chroniclepages[1].Pages;
                    
                    
                }
                if (chroniclepages != null) {
                    for (var count = 0; count < chroniclepages.length; count ++) {
                        console.log(count);
                        chronicledatalist.push( {name:chroniclepages[count].ChronicleName ,sections:0, id:chroniclepages[count].Id});
                         
                    }
                    $scope.chroniclesdataList = chronicledatalist;
                }
                  
            
            })
            .error(function (error) {
                $scope.status = "We having a problem " + error.message;
            });
    };
    
    
//    function groupChroniclesIntoSection(){
//        
//        for(var outerCounter = 0; outerCounter < chronicleresult.length ; outerCounter ++)
//        {
//            
//        }
//    }
//    
//    getAllChronicles();
//    
//     function getAllChroniclePages() {
//        chronicleFactory.getChroniclePages()
//            .success(function (chroniclepages) {
//                
//                 chronicleresult= chroniclepages;
//                if(chronicleresult.length>0)
//                {
//                    $scope.pages = chroniclepages[1].Pages;
//                }
//                if (chroniclepages != null) {
//                    for (var count = 0; count < chroniclepages.length; count ++) {
//                        console.log(count);
//                    }
//                }
//            })
//            .error(function (error) {
//                $scope.status = "We having a problem " + error.message;
//            });
//    };

//    pages = chronicleFactory.getAllChroniclePages();
//    if (pages != null) {
//
//        $scope.pages = pages;
//    }
    

}]);