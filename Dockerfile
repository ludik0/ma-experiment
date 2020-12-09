FROM python:3.7

COPY ./requirements.txt /requirements.txt

RUN pip install -r /requirements.txt

EXPOSE 8080

COPY ./app /app

WORKDIR /app

CMD ["uvicorn", "app.server:app", "--host", "0.0.0.0", "--port", "80"]