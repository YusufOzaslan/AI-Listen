from flask import Flask, jsonify, request
from detector import detect_faces

app = Flask(__name__)

@app.route('/detect_faces', methods=['POST'])
def detect_faces_route():
    
    data = request.get_json()
    if 'image_url' not in data:
        return jsonify({'error': 'No image provided'})
    
    image_url = data['image_url']
    faces = detect_faces(image_url)
    
    return jsonify({'faces': faces})

if __name__ == "__main__":
    app.run(host="0.0.0.0")