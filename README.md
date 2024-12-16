# iit-indoor-2024

# Django Development Period BD problem
I sometimes need to cancel all previous migrations
Mthod 1. ( keep the db )
```
python manage.py makemigrations
python manage.py showmigrations

python manage.py migrate --fake app1 app2
python manage.py showmigrations

find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete
python manage.py showmigrations

python manage.py makemigrations
python manage.py migrate --fake-initial

```
Method 2. ( delete all db )
```
// check
python manage.py showmigrations

// delete
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete

// check now
python manage.py showmigrations

// ( may need django reinstallation)
```

### Notebook
1. @property attr not sending from django rest
2. recent team store after registration complete