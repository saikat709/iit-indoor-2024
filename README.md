![Header styles](https://raw.githubusercontent.com/saikat709/iit-indoor-2024/refs/heads/main/assets_for_meadme/title.png)
# # IIT-Indoor-2024
##### Temporarily available at: https://iitindoor.pythonanywhere.com/

## Overview
**IIT-Indoor-2024** is a web application developed using **Django** for the backend and **React** for the frontend. The frontend is built separately in the `frontend` folder but is served through Django's routing system at `/` (home). The project aims to provide an efficient and user-friendly interface for managing indoor facilities at IIT.

## Features
- **Modern UI** powered by React.
- **Django Backend** with REST APIs.
- **Frontend Integration** via Django routing.
- **Authentication & Authorization** (if implemented).
- **Database Support** (PostgreSQL/MySQL/SQLite).
- **Responsive Design**.
- **Deployment Ready**.

## Project Structure
```
├── backend/               # Django Backend
│   ├── manage.py          # Django Management Script
│   ├── iitindoor
│       ├── settings.py        # Django Settings
│       ├── urls.py            # Routing Configuration
│       ├── views.py           # Backend Views
│   ├── static/            # Static Files
│   ├── templates/         # Django Templates
│   ├── media/             # Media Files (if any)
│
├── frontend/              # React Frontend (built separately)
│   ├── src/               # React Source Files
│   ├── public/            # Static Assets
│   ├── package.json       # Dependencies
│   ├── webpack.config.js  # Webpack Config (if used)
│   ├── build/             # Compiled Frontend for Deployment
│
├── assets_for_readme/     # Screenshots & Other Assets for Documentation
│
├── requirements.txt       # Python Dependencies
├── README.md              # Documentation
├── .gitignore             # Git Ignore Configurations
```

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Python 3.x
- Node.js & npm
- Django & React dependencies

### Backend Setup
```sh
cd backend
python -m venv venv        # Create a virtual environment
source venv/bin/activate   # Activate (use venv\Scripts\activate on Windows)
pip install -r requirements.txt  # Install dependencies
python manage.py migrate   # Apply migrations
python manage.py runserver  # Start the server
```

### Frontend Setup
```sh
cd frontend
npm install     # Install dependencies
npm run build   # Build the frontend
```

### Serve Frontend with Django
Build the project and copy the generated index.html file in templates directory, and js and css file to static directory of backend. and Modify the linking url in the index.html file using django static serving css and js.

## Usage
- Run the backend server using `python manage.py runserver`
- Access the application at `http://127.0.0.1:8000/`

## Screenshots
Below are some screenshots of the application:

![Header styles](https://raw.githubusercontent.com/saikat709/iit-indoor-2024/refs/heads/main/assets_for_meadme/header.png)

![moderator styles](https://raw.githubusercontent.com/saikat709/iit-indoor-2024/refs/heads/main/assets_for_meadme/moderator.png)

![Notification using email](https://raw.githubusercontent.com/saikat709/iit-indoor-2024/refs/heads/main/assets_for_meadme/notify.png)

![About section](https://raw.githubusercontent.com/saikat709/iit-indoor-2024/refs/heads/main/assets_for_meadme/about.png)

## Deployment
### Using Gunicorn & Nginx (For Production)
1. Install Gunicorn
   ```sh
   pip install gunicorn
   ```
2. Run the Gunicorn server
   ```sh
   gunicorn backend.wsgi:application --bind 0.0.0.0:8000
   ```
3. Set up Nginx as a reverse proxy.

## Contributing
- Fork the repository
- Create a new branch (`git checkout -b feature-branch`)
- Commit changes (`git commit -m "Added new feature"`)
- Push to the branch (`git push origin feature-branch`)
- Open a Pull Request
