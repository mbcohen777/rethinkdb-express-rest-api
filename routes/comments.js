var express = require('express');
var router = express.Router();

// rethinkdb
const r = require('rethinkdb');
var databaseName = process.env.RDB_DATABASE;
var tableName = "comments"; // set table name

/* add book */
router.post('/', (request,response ) => {
    let commenT ={
        'first_name': request.body.first_name,
        'last_name': request.body.last_name,
        'prop_id': request.body.prop_id,
        'stars': request.body.stars,
        'comment': request.body.comment
    };
  
    r.db(databaseName).table(tableName)
        .insert(commenT)
        .run(request._rdb)
        .then(cursor => cursor.toArray())
        .then( result => {
            // logic if you want to set
        })
        .catch(error => console.log(error));

    // response
    let data = {
        'success': true,
        'message': "Comment successfully added",
    };
    response.json(data);
});

/* get all books */
router.get('/', (request,response ) => {

    r.db(databaseName).table(tableName)
        .orderBy(r.desc("id"))
        .run(request._rdb)
        .then(cursor => cursor.toArray())
        .then(result => {
            response.json(result);
            result.render('index', { title: 'Comments' })
            
        })
        .catch( error => console.log(error));
});

/* get single book */
router.get('/:id', (request,response ) => {
    let id = request.params.id;

    r.db(databaseName).table(tableName)
        .get(id)
        .run(request._rdb)
        .then(result => {
            // logic if you want to set
            response.json(result);
        })
        .catch( error => console.log(error));
});

// update book
router.put( '/:id', (request,response ) => {
  let id = request.params.id;

  r.db(databaseName).table(tableName)
      .get( book_id )
      .update( {
        'first_name': request.body.first_name,
        'last_name': request.body.last_name,
        'prop_id': request.body.prop_id,
        'stars': request.body.stars,
        'comment': request.body.comment
      })
      .run( request._rdb )
      .then(cursor => cursor.toArray() )
      .then(result => {
          response.send(result);
      })
      .catch(error => console.log(error));

      // response
      let data = {
          'success': true,
          'message': "Comment successfully updated",
      };
      response.json(data);
});

// delete book
router.delete( '/:id', (request,response ) => {
  let id = request.params.id;

  r.db(databaseName).table(tableName)
      .get(id)
      .delete()
      .run(request._rdb)
      .then(cursor => cursor.toArray() )
      .then(result => {
        response.send(result);
      })
      .catch(error => console.log(error));

      // response
      let data = {
          'success': true,
          'message': "Comment successfully deleted",
      };
      response.json(data);
});

module.exports = router;