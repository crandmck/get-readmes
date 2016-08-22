# get-readmes
Simple Node script to pull down module READMEs using the GitHub API.
Primary use case is for use with Jekyll to include docs from external repositories.

## Install dependencies

```
cd get-readmes
npm install
```

## Use

1. Create `repos.json` containing list of repos for which you want to pull down READMEs.  A sample is provided.
1. Create directory, where you want to save the README files.  By default, the script
uses `./readmes` directory.  To change, set the `DIRPATH` variable in the script.  The directory _must_ exist before running the script.
1. To run the script:
```
node .
```

**NOTE**: This script accesses GitHub APIs without authorization.  Since it uses only
"read" operations, no authorization is required; however, for unauthenticated requests, GitHub API rate limit is 60 requests per hour. For more information, see [https://developer.github.com/v3/#rate-limiting](https://developer.github.com/v3/#rate-limiting).
