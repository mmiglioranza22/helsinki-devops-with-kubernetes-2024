#!/bin/bash
set -e
# test locally with INTERNAL_BACKEND_URL="http://localhost:5555/api/todos"
if [ $INTERNAL_BACKEND_URL ]; then
	echo backend url: $INTERNAL_BACKEND_URL
	TODO=$(curl -Ls -o /dev/null -w %{url_effective} https://en.wikipedia.org/wiki/Special:Random)
	echo Read: $TODO
	curl -X POST $INTERNAL_BACKEND_URL -H 'Content-Type: application/json' -d '{"todo": "Read '${TODO}'"}'
fi

# https://stackoverflow.com/questions/3074288/get-final-url-after-curl-is-redirected
# https://everything.curl.dev/usingcurl/verbose/writeout.html#:~:text=url_effective,headers%20(with%20-L%20).
