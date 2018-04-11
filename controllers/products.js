var app = angular.module('ShoppingListModule', ['ngAnimate'])
    .controller('ProductListController', ['$http', '$scope', function ($http, $scope) {
        $scope.total = 0;
        //calculate total cost ammount function
        $scope.calcTotal = function (products) {
            let temp = 0;
            for (let product of products)
                temp += product.quantity * product.cost;
            $scope.total = temp;
        }
        // get all products from API and save current state
        $http.get('/api/products').then(
            (res) => {
                $scope.products = res.data;
                $scope.calcTotal($scope.products);
            },
            (err) => {
                console.log(err.status + " " + err.statusText);
            });
        //frontend validate if same product entered twice
        var findSameAndUpdate = function (newP) {
            for (let prod of $scope.products)
                if (prod.name === newP.name && prod.category === newP.category) {
                    prod.quantity += newP.quantity;
                    prod.cost = newP.cost;
                    return prod._id;
                }
            return -1;
        }
        //make an api call to add a product into the database 
        $scope.formData = {};
        $scope.addProduct = function (form) {
            let productID = findSameAndUpdate($scope.formData);
            if (productID != -1) {
                $http.put('/api/products/' + productID, $scope.formData).then(
                    (res) => {
                        $scope.calcTotal($scope.products);
                        $scope.formData = {};
                    },
                    (err) => {
                        console.log(err.status + " " + err.statusText);
                    }
                )
            }
            else {
                $http.post('/api/products', $scope.formData).then(
                    (res) => {
                        $scope.products.push($scope.formData);
                        $scope.calcTotal($scope.products);
                        $scope.formData = {};
                    },
                    (err) => {
                        console.log(err.status + " " + err.statusText);
                    }
                )
            }
            //form validation cleanup
            form.$setPristine();
            form.$setUntouched();
        };
        //remove product from scope
        var findAndRemoveP = function (Pname, Pcategory) {
            for (let product of $scope.products)
                if (product.name === Pname && product.category === Pcategory)
                    $scope.products.splice($scope.products.indexOf(product), 1);
        }
        //make an api call to delete a product from the database
        $scope.deleteProduct = function (id, name, category) {
            $http.delete('/api/products/' + id).then(
                (res) => {
                    findAndRemoveP(name, category);
                    $scope.calcTotal($scope.products);
                },
                (err) => {
                    console.log(err.status + " " + err.status);
                }
            )
        };
        //misc - there's probably a hundred better ways to do this, but I'm tired and don't care atm.
        $scope.appendToSearchBox = function (imgCategory) {
            if ($scope.searchBox === imgCategory)
                $scope.searchBox = '';
            else
                $scope.searchBox = imgCategory;
        }
    }]);