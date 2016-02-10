
// var args = process.argv.slice(2);

// var dbname = args[1];

var dbname = "/Users/eric/workspace/metavine/metavine-mrc/db/files";

var dbmeta = require('db-meta');

dbmeta('sqlite3', { database: dbname }, function(meta) {
  meta.getVersion(function(err, version) {
    console.log('postgres version is ' + version);
  });

  meta.getTables(function(tables) {
    tables.forEach(function(table) {
      console.log('table name is ' + table.getName());
    });
  });
});