import math
from typing import List,Dict

Earth_Radius = 6371 # Earth radius in Km

def Haversine(lat1:float, lon1:float, lat2:float, lon2:float):
    #calculating two user-circle deistance in kilometer on two points on earth

    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    deltaPhi = math.radians(lat2 - lat1)
    deltaLamda = math.radians(lon2 - lon1)

    a = math.sin(deltaPhi/2)**2 + math.cos(phi1)*math.cos(phi2) * math.sin(deltaLamda/2)**2
    c = 2*math.atan2(math.sqrt(a), math.sqrt(1-a))

    return Earth_Radius * c

def get_nearby_users(target_user: Dict[str, float], all_users:List[Dict], radius:float): #target_user => current user location , all_users => from databases , radius => in Km
    nearby = []
    for u in all_users:
        distance = Haversine(target_user['lat'], target_user['lon'], u['lat'], u['lon'])
        if distance <= radius:
            nearby.append(u)
    
    return nearby



#Haversine formula usage :- 

# if __name__ == "__main__":
#     current_user = {'lat': 28.6139, 'lon': 77.2090}
#     all_users = [
#         {'id': 1, 'lat': 28.7041, 'lon': 77.1025},
#         {'id': 2, 'lat': 28.5355, 'lon': 77.3910}
#     ]

#     nearby = get_nearby_users(current_user, all_users, radius_km=10)
#     print("Nearby users:", nearby)