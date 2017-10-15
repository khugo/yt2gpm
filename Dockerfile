FROM python:3
ENV PYTHONBUFFERED 1
RUN mkdir /app
WORKDIR /app
RUN pip install pipenv
ADD Pipfile Pipfile.lock /app/
RUN pipenv install --system
ADD . /app/
CMD python app.py
