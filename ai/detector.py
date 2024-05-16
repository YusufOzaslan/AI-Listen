import requests
from PIL import Image
from io import BytesIO
from ultralytics import YOLO

def download_image(image_url):
    response = requests.get(image_url)
    if response.status_code == 200:
        return response.content
    else:
        return None
    
def calculate_area(box):
    x1, y1, x2, y2 = box
    width = x2 - x1
    height = y2 - y1
    area = width * height
    return area

def detect_faces(image_url):
    image_data = download_image(image_url)
    if image_data is None:
        return {'error': 'Failed to download image'}
    
    img = Image.open(BytesIO(image_data))
    
    model = YOLO("yolov8m-face.pt")
    results = model(img)
    
    boxes = results[0].boxes.xyxy.tolist()
    sorted_boxes = sorted(boxes, key=calculate_area, reverse=True)
    top_two_boxes = sorted_boxes[:2]
    
    faces_json = []
    for box in top_two_boxes:
        top_left_x, top_left_y, bottom_right_x, bottom_right_y = map(int, box)
        face = {
            'top_left_x': top_left_x,
            'top_left_y': top_left_y,
            'bottom_right_x': bottom_right_x,
            'bottom_right_y': bottom_right_y
        }
        faces_json.append(face)
        
    faces_json.sort(key=lambda x: x['top_left_x'])
    return faces_json

