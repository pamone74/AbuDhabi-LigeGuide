# 🧠 AbuDhabi-LifeGuide

**AbuDhabi-LifeGuide** is an AI-powered platform designed to enhance the everyday life of Abu Dhabi residents by leveraging public **open data**, predictive analytics, and intelligent recommendations. Whether it’s choosing the best neighborhoods, finding public services, or tracking air quality and urban development trends — LifeGuide delivers smart, data-backed insights for a more informed, connected, and sustainable urban experience.

---

## 🌍 Purpose

The platform aims to bridge the gap between **open government data** and **citizen empowerment**. By making data digestible and actionable, AbuDhabi-LifeGuide supports smarter living, better planning, and more sustainable choices for residents, urban developers, and policymakers.

---

## 🚀 Features

- 📊 **Open Data Integration**  
  Pulls live and historical data from Abu Dhabi’s open data portals (transport, health, education, safety, housing, etc.)

- 🧠 **AI-Powered Recommendations**  
  Uses machine learning models to suggest optimal residential areas based on user preferences and real-time data.

- 🗺️ **Interactive Smart Map**  
  View neighborhoods ranked by safety, air quality, affordability, education, and healthcare access.

- 📍 **Location Comparison Tool**  
  Compare two or more regions based on lifestyle KPIs.

- 📈 **Trend Forecasting**  
  See future predictions in traffic congestion, housing prices, or pollution levels using time-series modeling.

- 🔔 **Personalized Alerts**  
  Get updates about neighborhood developments, policy changes, or environmental warnings.

---

## 🏗️ Architecture Overview

---
## 🧰 Tech Stack

| Component          | Technology Used                  |
|--------------------|----------------------------------|
| 🖥 Frontend         | HTML, CSS, JavaScript, Leaflet.js |
| ⚙️ Backend          | Django, Django REST Framework     |
| 🧠 AI/ML            | Python, scikit-learn, pandas      |
| 🌐 Data Ingestion   | REST APIs, CSV Parsers            |

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-org/abudhabi-lifeguide.git
cd abudhabi-lifeguide

python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py runserver

http://127.0.0.1:8000/


