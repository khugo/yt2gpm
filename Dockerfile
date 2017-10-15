FROM python:3
ENV PYTHONBUFFERED 1
RUN mkdir /app
WORKDIR /app
ADD Pipfile Pipfile.lock /app
RUN pip install -p
ADD . /app
CMD python app.py