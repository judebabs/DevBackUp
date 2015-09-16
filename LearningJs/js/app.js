var app = angular.module('MyApp', [])

    .factory('mealFactory', ['$http', function ($http) {

        // var urlbase ='baseUrl of the web api'
            var mealFactory = {};
            //For now we are just faking an http call to get data but later on will consume the web api from the baacckend
            var mealMockData = [];
            mealMockData.push({ name: 'Jude', email: 'judeb@gmail.com', phone: '07933523641', role: 'Software Consultant', department: 'First Digital', office: 'Durban', manager: 'Gabriel M', gender: 'Male' });
            mealMockData.push({ name: 'Anny Benett', email: 'Annyb@gmail.com', phone: '07933523641', role: 'Human Resources', department: 'First Technology', office: 'Johannesburg', manager: 'Olivier L', gender: 'Female' });
            mealMockData.push({ name: 'Peter de Jong', email: 'peit@gmail.com', phone: '07933523641', role: 'Team Lead Development', department: 'First Digital', office: 'Durban', manager: 'Joak S', gender: 'Male' });
            mealMockData.push({ name: 'Chamir Bodasing', email: 'chamir@gmail.com', phone: '07933523641', role: 'Software Consultant', department: 'First Digital', office: 'Johannesburg', manager: 'Gabriel M', gender: 'Male' });
            mealMockData.push({ name: 'Aline Marthe', email: 'judeb@gmail.com', phone: '07933523641', role: 'Senior Sales Manager', department: 'FirstNet', office: 'Cape Town', manager: 'Olivier La', gender: 'Female' });


            mealFactory.getAllMeals = function() {

                //return $http.__defineGetter__(urlbase);
                return mealMockData;
            }

            mealFactory.getMealById = function(mealId) {

                //return $http.__defineGetter__(urlbase + '/' + mealId);
                var requestedMeal = null;
                for (var index = 0; index < mealMockData.length; index++) {
                    if (mealMockData[index].name == mealId) {
                        requestedMeal = mealMockData[index];
                        break;
                    }
                }
                return requestedMeal;
            }

        return mealFactory;

    }])

    .factory('chronicleFactory', ['$http', function ($http) {

//      var urlBase = 'http://localhost:19098/api';
//      var urlBase = 'http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL';
      var urlBase = 'http://localhost:1650/api/chronicle';
      var chronicleFactory = {};
    chronicleFactory.getChroniclePages = function () {
        return $http.get(urlBase);
    };
 
    return chronicleFactory;

    }]);