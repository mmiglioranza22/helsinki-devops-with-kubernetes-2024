FROM --platform=linux/amd64 alpine/curl

WORKDIR /usr/src/app

COPY cronjob.sh .

RUN ["chmod", "+x", "cronjob.sh"]

CMD ["sh", "cronjob.sh" ]
