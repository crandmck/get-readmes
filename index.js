var GitHubApi = require("github");
var github = new GitHubApi({
  debug: true,
  headers: { "Accept-Charset": "ISO-8859-1,utf-8"}
});

var DIRPATH = "readmes";

writeReadme = function(org, module, path) {
  var options = {};
  options.user = org;
  options.repo = module;

  github.repos.getLatestRelease({ user: org, repo: module }, function(err, res) {
    if(err) { // Use master release
      console.log("For " + org + "/" + module + " -- No latest release ");

    } else { // Use latest tagged release if it exists
      console.log("For " + org + "/" + module  + " latest release is " + res.tag_name );
      options.ref = res.tag_name;
    }

    github.repos.getReadme(options, function(err, res) {
      if (err) {
        console.log("ERROR! Cannot get README.")
        console.log(err);

      } else {
        console.log("Getting README for " + JSON.stringify(options) );
        writeMdFile(res.content, module);
      }
    })
  });
}

writeMdFile = function(str, module) {
  var file = __dirname + "/" + DIRPATH + "/" + module + ".md"
  var s = new Buffer(str, 'base64').toString();
  var fs = require('fs');
  fs.writeFile(file, s, function(err) {
      if(err) {
        return console.log(err);
      }
  });
}

/*
END OF FUNCTION DEFINITIONS.
*/
var repoList = require('./repos.json');

//nRepos = repoList.repos.length;
nRepos = 1;
for (i=0; i < nRepos ; i++ ) {
  console.log("org = " + repoList.repos[i].org  + " repo = " + repoList.repos[i].repoName )
  writeReadme(repoList.repos[i].org, repoList.repos[i].repoName , DIRPATH)
}
