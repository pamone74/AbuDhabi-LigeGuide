import requests
from django.http import JsonResponse
from django.shortcuts import render
import openai
import re

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
# def map_view(request):
#     return render(request, 'SmartRoute/mosque.html')
# def mosque_map(request):
#     return render(request, 'SmartRoute/mosque.html')
# def worship_places(request):
#     return render(request, 'SmartRoute/worship_places.html')
# def tourist(request):
#     return render(request, 'SmartRoute/tourist.html')
# def shopping(request):
#     return render(request, 'SmartRoute/shopping.html')
# def event(request):
#     return render(request, 'SmartRoute/event.html')
# def bookparking(request):
#     return render(request, 'SmartRoute/bookparking.html')

openai.api_key = "1SL5yj5wgPaivYPNfqgpuVmI8wBnKD57LBgBm4uHq6uexs4cs8cJJQQJ99AKACF24PCXJ3w3AAAAACOGaSsv"  # Replace with your Azure AI Key
openai.api_base = "https://amone-patrick.openai.azure.com/"
openai.api_type = "azure"
openai.api_version = "2023-03-15-preview"

from django.shortcuts import render
import openai  # Ensure you have the OpenAI library installed


import re

import re

def parse_and_format(raw_text):
    # Replace ** ** with <strong> tags
    formatted_text = re.sub(r"###\s*(\d+\.\s*)", r"\n<h3>\1", raw_text)
    formatted_text = re.sub(r"\*\*(.*?)\*\*", r"<strong>\1</strong>", raw_text)
    # Format numbered list (e.g., "1. ")
    formatted_text = re.sub(r"(\d+)\.\s*(<strong>.*?</strong>):", r"<ol>\n<li>\2</li>\n<ul>", formatted_text)
    # Format sub-points starting with "-"
    formatted_text = re.sub(r"-\s*", r"   <li>", formatted_text)
    # Close unordered list at the end of a sub-point section
    formatted_text = re.sub(r"\n(?=\d+\.|$)", r"</ul>\n", formatted_text)
    return formatted_text

# View for Worship Places churches 
def recommend_worship_church(request):
    context = {}
    emirates = [
        "Abu Dhabi", "Dubai", "Sharjah", "Ajman", 
        "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"
    ]
    context['emirates'] = emirates

    if request.method == "POST":
        selected_emirate = request.POST.get("emirate", "")
        location_query = request.POST.get("location_query", "").strip()

        # Construct prompts for worship places
        system_prompt = "You are a helpful assistant that recommends places of worship church in the UAE."
        user_prompt = (
            f"Suggest worship places in {selected_emirate}, UAE, based on the user input: {location_query}. "
            "Include details about facilities, accessibility, and any special features give me their cordinates."
        )
        try:
            response = openai.ChatCompletion.create(
                engine="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                max_tokens=1000
            )
            recommendations = response['choices'][0]['message']['content'].strip()
            context['recommendations'] = parse_and_format(recommendations)
            coordinate_pattern = r"(\d+\.\d+)[^\d]*(\d+\.\d+)[^\d]*([NS, EW]*)"
            coordinates = re.findall(coordinate_pattern, recommendations)
            coordinates_json = [{
            "lat": float(lat), 
            "lon": float(lon)
            } for lat, lon, _ in coordinates]
            # To pass the cordinates of returned location to the html to be rendered into the map
            context['coordinates'] = coordinates_json
        except Exception as e:
            context['error'] = "An error occurred while fetching recommendations. Please try again later."
    return render(request, "SmartRoute/worship_places.html", context)


# Mosque
def recommend_worship_mosque(request):
    context = {}
    emirates = [
        "Abu Dhabi", "Dubai", "Sharjah", "Ajman", 
        "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"
    ]
    context['emirates'] = emirates

    if request.method == "POST":
        selected_emirate = request.POST.get("emirate", "")
        location_query = request.POST.get("location_query", "").strip()

        # Construct prompts for worship places
        system_prompt = "You are a helpful assistant that recommends places of worship only mosque in the UAE."
        user_prompt = (
            f"Suggest worship places in {selected_emirate}, UAE, based on the user input: {location_query}. "
            "Include details about facilities, accessibility, and any special features."
        )

        try:
            response = openai.ChatCompletion.create(
                engine="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                max_tokens=1000
            )
            recommendations = response['choices'][0]['message']['content'].strip()
            context['recommendations'] = parse_and_format(recommendations)
            coordinate_pattern = r"(\d+\.\d+)[^\d]*(\d+\.\d+)[^\d]*([NS, EW]*)"
            coordinates = re.findall(coordinate_pattern, recommendations)
            coordinates_json = [{
            "lat": float(lat), 
            "lon": float(lon)
            } for lat, lon, _ in coordinates]
            # To pass the cordinates of returned location to the html to be rendered into the map
            context['coordinates'] = coordinates_json
        except Exception as e:
            context['error'] = "An error occurred while fetching recommendations. Please try again later."
    return render(request, "SmartRoute/mosque.html", context)



# View for Shopping
def recommend_shopping_places(request):
    context = {}
    emirates = [
        "Abu Dhabi", "Dubai", "Sharjah", "Ajman", 
        "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"
    ]
    context['emirates'] = emirates

    if request.method == "POST":
        selected_emirate = request.POST.get("emirate", "")
        location_query = request.POST.get("location_query", "").strip()

        # Construct prompts for shopping places
        system_prompt = "You are a helpful assistant that recommends shopping destinations in the UAE."
        user_prompt = (
            f"Recommend shopping destinations in {selected_emirate}, UAE. "
            f"User input includes: {location_query}. Focus on malls, markets, retail shops, and unique shopping areas with discounts."
        )
        try:
            response = openai.ChatCompletion.create(
                engine="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                max_tokens=1000
            )
            recommendations = response['choices'][0]['message']['content'].strip()
            context['recommendations'] = parse_and_format(recommendations)
            coordinate_pattern = r"(\d+\.\d+)[^\d]*(\d+\.\d+)[^\d]*([NS, EW]*)"
            coordinates = re.findall(coordinate_pattern, recommendations)
            coordinates_json = [{
            "lat": float(lat), 
            "lon": float(lon)
            } for lat, lon, _ in coordinates]
            # To pass the cordinates of returned location to the html to be rendered into the map
            context['coordinates'] = coordinates_json
        except Exception as e:
            context['error'] = "An error occurred while fetching recommendations. Please try again later."
    return render(request, "SmartRoute/shopping.html", context)


# View for Tourist Sites
def recommend_tourist_sites(request):
    context = {}
    emirates = [
        "Abu Dhabi", "Dubai", "Sharjah", "Ajman", 
        "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"
    ]
    context['emirates'] = emirates

    if request.method == "POST":
        selected_emirate = request.POST.get("emirate", "")
        location_query = request.POST.get("location_query", "").strip()

        # Construct prompts for shopping places
        system_prompt = "You are a helpful assistant that recommends tourists site in the UAE."
        user_prompt = (
            f"Recommend tourism destinations in {selected_emirate}, UAE. "
            f"User input includes: {location_query}. Focus cost, transportation, accessibility, tourguide, base on abu dhabi open data."
        )
        try:
            response = openai.ChatCompletion.create(
                engine="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                max_tokens=1000
            )
            recommendations = response['choices'][0]['message']['content'].strip()
            context['recommendations'] = parse_and_format(recommendations)
            coordinate_pattern = r"(\d+\.\d+)[^\d]*(\d+\.\d+)[^\d]*([NS, EW]*)"
            coordinates = re.findall(coordinate_pattern, recommendations)
            coordinates_json = [{
            "lat": float(lat), 
            "lon": float(lon)
            } for lat, lon, _ in coordinates]
            # To pass the cordinates of returned location to the html to be rendered into the map
            context['coordinates'] = coordinates_json
        except Exception as e:
            context['error'] = "An error occurred while fetching recommendations. Please try again later."
    return render(request, "SmartRoute/tourist.html", context)

# View for Events & entertainment
def recommend_events(request):
    context = {}
    emirates = [
        "Abu Dhabi", "Dubai", "Sharjah", "Ajman", 
        "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"
    ]
    context['emirates'] = emirates

    if request.method == "POST":
        selected_emirate = request.POST.get("emirate", "")
        location_query = request.POST.get("location_query", "").strip()

        # Construct prompts for shopping places
        system_prompt = "You are a helpful assistant that recommends tourists site in the UAE."
        user_prompt = (
            f"Recommend events & entertainment destinations in {selected_emirate}, UAE. "
            f"User input includes: {location_query}. events, accessibility, parking, base on abu dhabi open data, caltural events places"
        )
        try:
            response = openai.ChatCompletion.create(
                engine="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                max_tokens=1000
            )
            recommendations = response['choices'][0]['message']['content'].strip()
            context['recommendations'] = parse_and_format(recommendations)
            coordinate_pattern = r"(\d+\.\d+)[^\d]*(\d+\.\d+)[^\d]*([NS, EW]*)"
            coordinates = re.findall(coordinate_pattern, recommendations)
            coordinates_json = [{
            "lat": float(lat), 
            "lon": float(lon)
            } for lat, lon, _ in coordinates]
            # To pass the cordinates of returned location to the html to be rendered into the map
            context['coordinates'] = coordinates_json
        except Exception as e:
            context['error'] = "An error occurred while fetching recommendations. Please try again later."
    return render(request, "SmartRoute/event.html", context)


#  Genaral code 
import logging
logger = logging.getLogger(__name__)

def get_openai_recommendations(system_prompt, user_prompt):
    try:
        response = openai.ChatCompletion.create(
            engine="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            max_tokens=1000
        )
        if 'choices' in response and len(response['choices']) > 0:
            return response['choices'][0]['message']['content'].strip()
        else:
            return "No recommendations found."
    except Exception as e:
        logger.error(f"OpenAI API Error: {str(e)}")
        return "An error occurred while fetching recommendations."



# Booking Parking

from django.http import JsonResponse
from .models import ParkingSpot

def book_parking_spot(request, spot_id):
    if request.method == 'POST':
        try:
            spot = ParkingSpot.objects.get(spot_id=spot_id)
            if not spot.booked:
                spot.booked = True
                spot.save()
                return JsonResponse({'success': True, 'message': 'Parking spot booked successfully!'})
            else:
                return JsonResponse({'success': False, 'message': 'Parking spot already booked!'})
        except ParkingSpot.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Parking spot not found!'})
    return JsonResponse({'success': False, 'message': 'Invalid request method!'})


from .models import ParkingSpot

def parking_page(request):
     # Get all parking spots
    spots = ParkingSpot.objects.all().values('spot_id','latitude', 'longitude', 'booked')
    for spot in spots:
        spot['booked'] = 1 if spot['booked'] else 0 

    # Render the template and pass the spots as context
    return render(request, 'SmartRoute/bookparking.html', {'spots': list(spots)})

from django.http import JsonResponse
from .models import ParkingSpot

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import ParkingSpot

def book_parking_spot(request, spot_id):
    if request.method == 'POST':
        # Get the parking spot
        spot = get_object_or_404(ParkingSpot, spot_id=spot_id)

        # Check if already booked
        if spot.booked:
            return JsonResponse({'success': False, 'message': 'Spot already booked'}, status=400)
        
        # Mark the spot as booked
        spot.booked = True
        spot.save()

        return JsonResponse({'success': True, 'message': 'Spot booked successfully'})
    return JsonResponse({'success': False, 'message': 'Invalid request'}, status=400)


# Adding cordinates to database 

from django.shortcuts import render
from . models import ParkingSpot

def add_coordinates(request):
   
   
    
    
    
    for lat, lon in coordinates:
        ParkingSpot.objects.create(latitude=lat, longitude=lon)

    return render(request, 'your_template.html')
