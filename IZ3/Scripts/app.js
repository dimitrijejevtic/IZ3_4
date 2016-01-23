var ViewModel = function () {
    var self = this;
    self.products = ko.observableArray();
    self.error = ko.observable();
    var productsUri = 'api/Products/';

    function ajaxHelper(uri, method, data) {
        self.error('');
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }
    function getAllProducts() {
        ajaxHelper(productsUri, 'GET').done(function (data) {
            self.products(data);
        });
    }
    getAllProducts();

    self.detail = ko.observable();

    self.getProductDetail = function (item) {
        ajaxHelper(productsUri+item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    }
    self.newProduct = {
        Name: ko.observable(),
        Description:ko.observable()
    }
    self.addProduct = function (formElement) {
        var product = {
            Name: self.newProduct.Name(),
            Description: self.newProduct.Description()
        };
        ajaxHelper(productsUri, 'POST', product).done(function (item) {
            self.products.push(item);
        });
    }

};
ko.applyBindings(new ViewModel());