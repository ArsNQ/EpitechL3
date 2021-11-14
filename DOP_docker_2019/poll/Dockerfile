FROM python
EXPOSE 80

ADD static/stylesheets templates app.py requirements.txt ./

RUN mkdir templates | mv index.html templates/
RUN mkdir static && cd static && mkdir stylesheets
RUN mv style.css static/stylesheets/
RUN cd /
RUN pip install -r requirements.txt

CMD ["flask", "run",  "--host=0.0.0.0", "--port=80"]
