
var connection = require('../config/connection.js');

module.exports = {

    insertCategories: function (data, callback) {
        var agree = [];

        if (typeof data == 'string') {
            insert(data);
        } else if (typeof data == 'object') {
            for (var i = 0; i < data.length; i++) {
                insert(data[i]);

            }

        }



        function insert(value) {
            connection.query({
                sql: 'SELECT * FROM `category` WHERE `name` = ?',
                timeout: 40000, // 40s 
                values: [value]
            }, function (error, results, fields) {
                if (error) {
                    return (error);
                } else {
                    var size = results.length;
                    if (size == 0) {
                        connection.query({
                            sql: 'INSERT INTO category(name) VALUES(?)',
                            timeout: 40000, // 40s 
                            values: [value.toUpperCase()]
                        }, function (error, results, fields) {
                            if (error) {
                                return (error);
                            } else {
                                agree.push(value);
                                return (results);
                            }
                        })
                    } else {
                    }
                }
            });
        }
        callback({ data: agree });
    },

    insertBrands: function (data, callback) {

        if (typeof data == 'string') {
            insert(data);
        } else if (typeof data == 'object') {
            for (var i = 0; i < data.length; i++) {
                insert(data[i])

            }

        }


        function insert(value) {
            var good = [];
            var wrong = [];
            connection.query({
                sql: 'SELECT * FROM `brand` WHERE `name` = ?',
                timeout: 40000, // 40s 
                values: [value]
            }, function (error, results, fields) {
                if (error) {
                    wrong.push(value);
                } else {
                    var size = results.length;
                    if (size == 0) {
                        connection.query({
                            sql: 'INSERT INTO brand(name) VALUES(?)',
                            timeout: 40000, // 40s 
                            values: [value.toUpperCase()]
                        }, function (error, results, fields) {
                            if (error) {
                                wrong.push(value);
                            } else {
                                good.push(value);
                            }
                        })
                    } else {
                    }
                }
            });

            return { good: good, wrong: wrong }
        }

    },

    insertModels: function (data, callback) {

        if (typeof data == 'string') {
            var split = data.split('+=+');
            var model = {
                description: split[0],
                code: split[1],
                category: split[2],
                brand: split[3]
            };

            insert(model);

        } else if (typeof data == 'object') {
            for (var i = 0; i < data.length; i++) {
                var split = data[i].split('+=+');
                var model = {
                    description: split[0],
                    code: split[1],
                    category: split[2],
                    brand: split[3]
                }

                insert(model);
            }

        }



        function insert(data) {
            connection.query({
                sql: 'SELECT * FROM `model` WHERE `code` = ?',
                timeout: 40000, // 40s 
                values: [data.code]
            }, function (error, results, fields) {

                if (error) {
                    return (error);
                } else {
                    var size = results.length;
                    if (size == 0) {
                        connection.query({
                            sql: 'INSERT INTO model(code, description, category, brand) VALUES(?,?,(SELECT id FROM category WHERE name=?),(SELECT id FROM brand WHERE name=?))',
                            timeout: 40000, // 40s 
                            values: [data.code.toUpperCase(), data.description.toUpperCase(), data.category, data.brand]
                        }, function (error, results, fields) {
                            if (error) {
                                return (error);
                            } else {
                                return (results);
                            }
                        })
                    } else {
                    }
                }
            });
        }
        callback(mensaje);
    },


    insertBarcode: function (data, callback) {

        if (typeof data == 'string') {
            var split = data.split('+=+');
            var model = {
                variant: split[0],
                barcode: split[1],
                location: split[2],
                observation: split[3],
                bill: split[4]
            };
            console.log(model);
            

            insert(model);

        } else if (typeof data == 'object') {
            for (var i = 0; i < data.length; i++) {
                var split = data[i].split('+=+');
                var model = {
                    variant: split[0],
                    barcode: split[1],
                    location: split[2],
                    observation: split[3],
                    bill: split[4]
                }
                console.log(model);
                insert(model);
            }

        }



        function insert(data) {
            if (data.barcode=='S/N') {
              
            }
          

            if (data.price == '') {
                data.price = 0;
            }

            if (data.cant == '') {
                data.cant = 1
            }

            switch (data.barcode) {
                case 'A/S':
                    break;

                case 'S/N':
                   
                    break;
                default:
                    connection.query({
                        sql: 'SELECT * FROM `product` WHERE `barcode` = ?',
                        timeout: 40000, // 40s 
                        values: [data.barcode]
                    }, function (error, results, fields) {
                        if (error) {
                            return (error);
                        } else {
                            var size = results.length;
                            if (size == 0) {
                                connection.query({
                                    sql: 'INSERT INTO product(barcode, variant, price, location,bill, observation) VALUES(?,(SELECT id FROM model WHERE code=?),?,(SELECT id FROM location WHERE name=?),?,?)',
                                    timeout: 40000, // 40s 
                                    values: [data.barcode.toUpperCase(), data.variant, data.price, data.location, data.bill, data.observation.toUpperCase()]
                                }, function (error, results, fields) {
                                    if (error) {
                                    

                                        return (error);
                                    } else {
                                        return (results);
                                    }
                                })
                            } else {
                            }
                        }
                    });
                    break;
            }





        }

    },

    insertBarcode2: function (data, callback) {
        var sql = generate(data);

    },

    insertLocation: function (data, callback) {

        if (typeof data == 'string') {
            insert(data);
        } else if (typeof data == 'object') {
            for (var i = 0; i < data.length; i++) {
                insert(data[i]);

            }
        }



        function insert(value) {
            connection.query({
                sql: 'SELECT * FROM `location` WHERE `name` = ?',
                timeout: 40000, // 40s 
                values: [value]
            }, function (error, results, fields) {
                if (error) {
                    return (error);
                } else {
                    var size = results.length;
                    if (size == 0) {
                        connection.query({
                            sql: 'INSERT INTO location(name) VALUES(?)',
                            timeout: 40000, // 40s 
                            values: [value]
                        }, function (error, results, fields) {
                            if (error) {
                                return (error);
                            } else {
                                return (results);
                            }
                        })
                    } else {
                    }
                }
            });
        }

    },
}

function generate(data) {
var values='';

    for (var i = 0; i < data.length; i++) {
        var split = data[i].split('+=+');
        var model = {
            variant: split[0],
            barcode: split[1],
            price: split[2],
            location: split[3],
            bill: split[4],
            cant: split[5],
        }


        switch (model.variant) {
            case 'A/S':

                break;
            case 'S/N':
                break;

            default:

                connection.query({
                    sql: 'SELECT * FROM `producto` WHERE `barcode` = ?',
                    timeout: 40000, // 40s 
                    values: [model.variant]
                }, function (error, results, fields) {
                    if (error) {
                      
                    } else {
                        //INSERT INTO product(barcode, variant, price, location,bill, observation) VALUES(?,(SELECT id FROM model WHERE code=?),?,(SELECT id FROM location WHERE name=?),?,?)
                      if (results.length==0) {
                          values+='VALUES(\''+model.barcode+'\',(SELECT id FROM model WHERE code=\''+model.variant+'\'),\''+model.price+'\',(SELECT id FROM location WHERE name=\''+model.location+'\'),\''+model.bill+'\',\''+model.observation+'\')'
                      }
                    }
                });



                break;
        }

    }
}