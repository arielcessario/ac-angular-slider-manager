(function () {
    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    //console.log(currentScriptPath);

    angular.module('slider.manager', ['ngRoute', 'toastr'])
        .directive('sliderDirective', SliderDirective)
        .factory('servicio', Servicio)
        .service('sliderProductos', SliderProductos)
        .service('slider', Slider)
        .directive('dbinfOnFilesSelectedSliders', dbinfOnFilesSelectedSliders);

    SliderProductos.$inject = ["$http", "$scope", "$routeParams", "SlidersService", "$location", "toastr",
        'ProductosService'];
    function SliderProductos($http, $scope, $routeParams, SlidersService, $location, toastr,
                             ProductosService) {
        this.ctrl = function () {

            var vm = this;
            $scope.agregarImagen = agregarImagen;
            vm.producto_slider_01 = '';
            vm.save = save;
            //vm.searchProductoParaSlider = searchProductoParaSlider;
            vm.fn_productos = ProductosService.getProductoByName;
            vm.lista_slider_01 = [];
            vm.producto_01 = {};
            var foto = {};
            var foto_01 = {};
            var foto_02 = {};
            var foto_03 = {};
            var foto_04 = {};

            vm.slider = [];
            vm.slider_01 = {
                titulo: '',
                descripcion: '',
                imagen: 0,
                slider_id: 1,
                precio: 0,
                producto_id: 0
            };

            vm.slider_02 = {
                titulo: '',
                descripcion: '',
                imagen: 0,
                slider_id: 1,
                precio: 0,
                producto_id: 0
            };

            vm.slider_03 = {
                titulo: '',
                descripcion: '',
                imagen: 0,
                slider_id: 1,
                precio: 0,
                producto_id: 0
            };

            vm.slider_04 = {
                titulo: '',
                descripcion: '',
                imagen: 0,
                slider_id: 1,
                precio: 0,
                producto_id: 0
            };


            SlidersService.getSliders(function (data) {
                data[0].precio = parseFloat(data[0].precio);
                data[1].precio = parseFloat(data[1].precio);
                data[2].precio = parseFloat(data[2].precio);
                data[3].precio = parseFloat(data[3].precio);
                vm.slider_01 = data[0];
                vm.slider_02 = data[1];
                vm.slider_03 = data[2];
                vm.slider_04 = data[3];
            });


            function save() {
                vm.slider_01.producto_id = vm.slider_01.producto[0].producto_id;
                vm.slider_02.producto_id = vm.slider_02.producto[0].producto_id;
                vm.slider_03.producto_id = vm.slider_03.producto[0].producto_id;
                vm.slider_04.producto_id = vm.slider_04.producto[0].producto_id;
                vm.slider.push(vm.slider_01);
                vm.slider.push(vm.slider_02);
                vm.slider.push(vm.slider_03);
                vm.slider.push(vm.slider_04);

                SlidersService.saveSlider(vm.slider, 'saveSlider', function (data) {
                    uploadImages(foto_01);
                    uploadImages(foto_02);
                    uploadImages(foto_03);
                    uploadImages(foto_04);
                    toastr.success('Sliders actualizadas con exito.')
                });
            }


            function uploadImages(file) {
                //var files = document.getElementById("images");
                //console.log(files.files[0]);
                //console.log(vm.fotos);

                var form_data = new FormData();

                //vm.fotos.forEach(function (entry) {

                //form_data.append('images', files.files[0]);
                //console.log(entry);
                form_data.append('images', file);
                //});

                var ajax = new XMLHttpRequest();
                ajax.onprogress = function () {

                };
                ajax.onload = function (data) {
                    //console.log(data);

                    //toastr.success("Slider guardado con éxito");
                    //$location.path('/listado_slider');


                };
                ajax.open("POST", "./stock-api/upload.php");
                ajax.send(form_data);


            }

            function agregarImagen(filelist, slider) {
                var file = filelist.item(0);
                switch (slider) {
                    case 1:
                        vm.slider_01.imagen = file.name;
                        foto_01 = file;
                        break;
                    case 2:
                        vm.slider_02.imagen = file.name;
                        foto_02 = file;
                        break;
                    case 3:
                        vm.slider_03.imagen = file.name;
                        foto_03 = file;
                        break;
                    case 4:
                        vm.slider_04.imagen = file.name;
                        foto_04 = file;
                        break;

                }


                //for (var i = 0; i < filelist.length; ++i) {
                //    var file = filelist.item(i);
                //    //do something with file; remember to call $scope.$apply() to trigger $digest (dirty checking)
                //    //imagesList.push(file);
                //    vm.fotos.push(file);
                //    foto = {};
                //    foto.nombre = file.name;
                //    foto.destacado = 1;
                //    vm.slider.fotos.push(foto);
                //    //console.log((vm.slider.fotos));
                //}
                $scope.$apply();
            }


        }
    }

    Slider.$inject = ["$http", "$scope", "$routeParams", "SlidersService", "$location", "toastr"];
    function Slider($http, $scope, $routeParams, SlidersService, $location, toastr) {
        this.ctrl = function () {

            var vm = this;
            $scope.agregarImagen = agregarImagen;
            vm.producto_slider_01 = '';
            vm.save = save;
            vm.lista_slider_01 = [];
            var foto = {};
            var foto_01 = {};
            var foto_02 = {};
            var foto_03 = {};
            var foto_04 = {};

            vm.slider = [];
            vm.slider_01 = {
                titulo: '',
                descripcion: '',
                imagen: 0,
                slider_id: 1,
                precio: 0,
                producto_id: 0
            };

            vm.slider_02 = {
                titulo: '',
                descripcion: '',
                imagen: 0,
                slider_id: 1,
                precio: 0,
                producto_id: 0
            };

            vm.slider_03 = {
                titulo: '',
                descripcion: '',
                imagen: 0,
                slider_id: 1,
                precio: 0,
                producto_id: 0
            };

            vm.slider_04 = {
                titulo: '',
                descripcion: '',
                imagen: 0,
                slider_id: 1,
                precio: 0,
                producto_id: 0
            };


            SlidersService.getSliders(function (data) {
                data[0].precio = parseFloat(data[0].precio);
                data[1].precio = parseFloat(data[1].precio);
                data[2].precio = parseFloat(data[2].precio);
                data[3].precio = parseFloat(data[3].precio);
                vm.slider_01 = data[0];
                vm.slider_02 = data[1];
                vm.slider_03 = data[2];
                vm.slider_04 = data[3];
            });


            function save() {
                vm.slider_01.producto_id = -1;
                vm.slider_02.producto_id = -1;
                vm.slider_03.producto_id = -1;
                vm.slider_04.producto_id = -1;
                vm.slider.push(vm.slider_01);
                vm.slider.push(vm.slider_02);
                vm.slider.push(vm.slider_03);
                vm.slider.push(vm.slider_04);

                SlidersService.saveSlider(vm.slider, 'saveSlider', function (data) {
                    uploadImages(foto_01);
                    uploadImages(foto_02);
                    uploadImages(foto_03);
                    uploadImages(foto_04);
                    toastr.success('Sliders actualizadas con exito.')
                });
            }


            function uploadImages(file) {
                //var files = document.getElementById("images");
                //console.log(files.files[0]);
                //console.log(vm.fotos);

                var form_data = new FormData();

                //vm.fotos.forEach(function (entry) {

                //form_data.append('images', files.files[0]);
                //console.log(entry);
                form_data.append('images', file);
                //});

                var ajax = new XMLHttpRequest();
                ajax.onprogress = function () {

                };
                ajax.onload = function (data) {
                    //console.log(data);

                    //toastr.success("Slider guardado con éxito");
                    //$location.path('/listado_slider');


                };
                ajax.open("POST", "./stock-api/upload.php");
                ajax.send(form_data);


            }

            function agregarImagen(filelist, slider) {
                var file = filelist.item(0);
                switch (slider) {
                    case 1:
                        vm.slider_01.imagen = file.name;
                        foto_01 = file;
                        break;
                    case 2:
                        vm.slider_02.imagen = file.name;
                        foto_02 = file;
                        break;
                    case 3:
                        vm.slider_03.imagen = file.name;
                        foto_03 = file;
                        break;
                    case 4:
                        vm.slider_04.imagen = file.name;
                        foto_04 = file;
                        break;

                }


                //for (var i = 0; i < filelist.length; ++i) {
                //    var file = filelist.item(i);
                //    //do something with file; remember to call $scope.$apply() to trigger $digest (dirty checking)
                //    //imagesList.push(file);
                //    vm.fotos.push(file);
                //    foto = {};
                //    foto.nombre = file.name;
                //    foto.destacado = 1;
                //    vm.slider.fotos.push(foto);
                //    //console.log((vm.slider.fotos));
                //}
                $scope.$apply();
            }


        }
    }


    SliderDirective.$inject = ['$location', '$route', 'servicio'];
    function SliderDirective($location, $route, servicio) {
        return {
            restrict: 'E',
            scope: {
                conProductos: '='
            },
            templateUrl: currentScriptPath.replace('.js', '.html'),
            controller: function ($scope, $compile, $http) {

                var vm = this;

                servicio.ctrl();


            },

            controllerAs: 'sliderCtrl'
        };
    }

    function dbinfOnFilesSelectedSliders() {
        return {
            restrict: 'A',
            scope: {
                //attribute data-dbinf-on-files-selected (normalized to dbinfOnFilesSelected) identifies the action
                //to take when file(s) are selected. The '&' says to  execute the expression for attribute
                //data-dbinf-on-files-selected in the context of the parent scope. Note though that this '&'
                //concerns visibility of the properties and functions of the parent scope, it does not
                //fire the parent scope's $digest (dirty checking): use $scope.$apply() to update views
                //(calling scope.$apply() here in the directive had no visible effect for me).
                dbinfOnFilesSelectedSliders: '&'
            },
            link: function (scope, element, attr, Controller) {
                element.bind("change", function () {  //match the selected files to the name 'selectedFileList', and
                    //execute the code in the data-dbinf-on-files-selected attribute
                    scope.dbinfOnFilesSelectedSliders({selectedFileList: element[0].files});
                });
            }
        }
    }

    SlidersService.$inject = ['$http', '$cacheFactory'];
    function SlidersService($http, $cacheFactory) {
        var service = {};
        var sucursal_id = 1;
        var clearCache = false;
        var url = currentScriptPath.replace('.js', '.php');

        service.getSliders = getSliders;
        service.saveSlider = saveSlider;

        return service;

        function getSliders(callback) {
            var $httpDefaultCache = $cacheFactory.get('$http');
            var cachedData = [];
            if (clearCache) {
                $httpDefaultCache.remove(url + '?function=getSliders');


            }


            return $http.get(url + '?function=getSliders', {cache: false})
                .success(function (data) {
                    callback(data);
                    clearCache = false;
                })
                .error(function (data) {

                });


        }

        function saveSlider(slider, _function, callback) {

            return $http.post(url,
                {function: _function, slider: JSON.stringify(slider)})
                .success(function (data) {
                    callback(data);
                    clearCache = true;
                })
                .error(function (data) {
                });
        }

    }


    Servicio.$inject = ['$injector', '$scope'];
    function Servicio($injector, $scope) {


        if ($scope.conProductos) {
            return $injector.get('sliderProductos');
        } else {
            return $injector.get('slider');
        }

    }

})();


//
//(function () {
//
//
//
//    angular.module('slider.manager', ['ngRoute', 'toastr'])
//
//        .config(['$routeProvider', function ($routeProvider) {
//            $routeProvider.when('/slider', {
//                templateUrl: currentScriptPath.replace('.js', '.html'),
//                controller: 'SlidersController'
//            });
//        }])
//
//        .controller('SlidersController', SlidersController)
//        .service('SlidersService', SlidersService)
//        .directive('dbinfOnFilesSelectedSliders', dbinfOnFilesSelectedSliders);
//
//    SlidersController.$inject = ["$http", "$scope", "$routeParams", "SlidersService", "$location", "toastr",
//    'ProductosService'];
//    function SlidersController($http, $scope, $routeParams, SlidersService, $location, toastr,
//                               ProductosService) {
//
//    }
//
//    function dbinfOnFilesSelectedSliders() {
//        return {
//            restrict: 'A',
//            scope: {
//                //attribute data-dbinf-on-files-selected (normalized to dbinfOnFilesSelected) identifies the action
//                //to take when file(s) are selected. The '&' says to  execute the expression for attribute
//                //data-dbinf-on-files-selected in the context of the parent scope. Note though that this '&'
//                //concerns visibility of the properties and functions of the parent scope, it does not
//                //fire the parent scope's $digest (dirty checking): use $scope.$apply() to update views
//                //(calling scope.$apply() here in the directive had no visible effect for me).
//                dbinfOnFilesSelectedSliders: '&'
//            },
//            link: function (scope, element, attr, Controller) {
//                element.bind("change", function () {  //match the selected files to the name 'selectedFileList', and
//                    //execute the code in the data-dbinf-on-files-selected attribute
//                    scope.dbinfOnFilesSelectedSliders({selectedFileList: element[0].files});
//                });
//            }
//        }
//    }
//
//    SlidersService.$inject = ['$http', '$cacheFactory'];
//    function SlidersService($http, $cacheFactory) {
//        var service = {};
//        var sucursal_id = 1;
//        var clearCache = false;
//
//        service.getSliders = getSliders;
//        service.saveSlider = saveSlider;
//
//        return service;
//
//        function getSliders(callback) {
//            var $httpDefaultCache = $cacheFactory.get('$http');
//            var cachedData = [];
//            if (clearCache) {
//                $httpDefaultCache.remove('./stock-api/slider-manager.php?function=getSliders');
//
//
//            }
//
//
//            return $http.get('./stock-api/slider-manager.php?function=getSliders', {cache: false})
//                .success(function (data) {
//                    callback(data);
//                    clearCache = false;
//                })
//                .error(function(data){
//
//                });
//
//
//        }
//
//        function saveSlider(slider, _function, callback) {
//
//            return $http.post('./stock-api/slider-manager.php',
//                {function: _function, slider: JSON.stringify(slider)})
//                .success(function (data) {
//                    callback(data);
//                    clearCache = true;
//                })
//                .error(function(data){});
//        }
//
//    }
//
//})();

