var omsApp=angular.module("OMS",["ngMessages","ngMaterial"]).run(function(){console.log("Application has been started....!")});omsApp.service("showDialog",["$mdDialog",function(a){return function(b,c,d,e){a.show({controller:d,templateUrl:e,parent:angular.element(document.body),targetEvent:b,clickOutsideToClose:!0,fullscreen:c.customFullscreen}).then(function(a){},function(){})}}]),omsApp.service("verifyDelete",["$mdDialog",function(a){return function(b){var c=a.confirm().title("Confirm Your Choice").content("Are you sure you want to delete the record?").ariaLabel("Delete Record").ok("Delete Record").cancel("Cancel");return a.show(c)}}]),omsApp.service("toast",["$mdToast",function(a){return function(b){a.show(a.simple().textContent(b).hideDelay(3e3).highlightAction(!0).highlightClass("md-warn").position("bottom right").capsule(!0))}}]),omsApp.controller("omsCtl",["$rootScope","$scope","$http","$mdDialog","verifyDelete","toast","showDialog","omsFactory",function(a,b,c,d,e,f,g,h){b.sortType="clientId",b.sortReverse=!1,b.loadData=function(){h.getAllUsers().then(function(c){a.users=c.data,b.adminUser=a.users[0],h.getAllOrders().then(function(a){b.orders=a.data,b.total=0,angular.forEach(b.orders,function(a,c){b.total+=Number(a.price)})})})},b.loadData(),b.createOrder=function(a){scope=b.$new(),g(a,b,["$rootScope","$scope","$mdDialog","$http","toast",function(a,b,c,d,e){b.title="Create New Order",b.btn="Create",b.type="add",b.newOrder={id:Math.round(1e11*Math.random())+1,name:"",weight:"",description:"",price:"",destination:"",qty:"",createDate:(new Date).getDate()+"-"+((new Date).getMonth()+1)+"-"+(new Date).getFullYear(),clientId:""},b.create=function(){d.post("http://localhost:3000/order",b.newOrder).success(function(a,b,d,f){e("The new order has been added!"),scope.loadData(),c.cancel()})},b.cancel=function(){c.cancel()}}],"order.html")},b.editOrDeleteOrder=function(a,c){scope=b.$new(),g(a,b,["$scope","$mdDialog","$http","toast",function(a,b,d,e){a.title="Edit/Delete Order",a.btn="Update",a.type="edit",a.newOrder=c,a.create=function(){d.put("http://localhost:3000/order/"+a.newOrder.id,a.newOrder).success(function(a,c,d,f){e("The order has been updated!"),scope.loadData(),b.cancel()})},a.remove=function(){var f=b.confirm().title("Are you sure to delete the order?").textContent("Order will be deleted permanently.").ariaLabel("Remove Order").targetEvent(event).ok("Yes").cancel("No");b.show(f).then(function(){a.status="Order has been removed successfully!",d["delete"]("http://localhost:3000/order/"+c.id).success(function(a,b,c,d){scope.loadData(),e("Order has been removed!")})},function(){a.status="You decided to keep the order."})},a.cancel=function(){b.cancel()}}],"order.html")},b.editUser=function(a,c){g(a,b,["$scope","$mdDialog","$http","toast",function(a,b,d,e){a.title="Edit User",a.newUser=c,a.update=function(){d.put("http://localhost:3000/user/"+a.newUser.id,a.newUser).success(function(a,c,d,f){e("The user has been updated!"),b.cancel()})},a.cancel=function(){b.cancel()}}],"user.html")},b.logout=function(a){console.log("The user logout process!!!")}}]),omsApp.factory("omsFactory",["$http",function(a){var b={getAllOrders:function(){var b=a({url:"https://raw.githubusercontent.com/AJ-7885/AngularJS-Order-Management-System-Sample/master/public_html/_/js/orders.json",method:"GET"});return b.success(function(a,b,c,d){return a}),b},getAllUsers:function(){var b=a({url:"https://raw.githubusercontent.com/AJ-7885/AngularJS-Order-Management-System-Sample/master/public_html/_/js/users.json",method:"GET"});return b.success(function(a,b,c,d){return a}),b}};return b}]);