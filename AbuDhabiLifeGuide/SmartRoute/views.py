import requests
from django.http import JsonResponse
from django.shortcuts import render

def fetch_parking_data(request):
    url = 'https://arcgis.sdi.abudhabi.ae/agspublish/rest/services/OpenData/ADSDI_OpenData/MapServer/91/query'
    params = {
        'where': '1=1',  # query all
        'outFields': '*',
        'f': 'json'
    }
    response = requests.get(url, params=params)
    data = response.json()
    return JsonResponse(data)

def home(request):
    return render(request, 'SmartRoute/index.html')
def map_view(request):
    return render(request, 'SmartRoute/mosque.html')
def mosque_map(request):
    return render(request, 'SmartRoute/mosque.html')
def videoStart(request):
    return render(request, 'SmartRoute/videoStart.html')
