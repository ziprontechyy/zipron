from flask import Flask, request, jsonify, send_from_directory
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='.', static_url_path='')

# Web3Form configuration
WEB3FORM_ACCESS_KEY = os.getenv('WEB3FORM_ACCESS_KEY')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('.', path)

@app.route('/send', methods=['POST'])
def send_message():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'message': 'No data received'}), 400
        
        # Extract form data
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()
        
        # Validation
        if not all([name, email, subject, message]):
            return jsonify({'success': False, 'message': 'All fields are required'}), 400
        
        # Email validation
        import re
        email_pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
        if not re.match(email_pattern, email):
            return jsonify({'success': False, 'message': 'Invalid email address'}), 400
        
        # Prepare data for Web3Form
        web3form_data = {
            'access_key': WEB3FORM_ACCESS_KEY,
            'name': name,
            'email': email,
            'subject': subject,
            'message': message
        }
        
        # Send to Web3Form API
        response = requests.post(
            'https://api.web3forms.com/submit',
            json=web3form_data,
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 200:
            return jsonify({
                'success': True, 
                'message': 'Message sent successfully!'
            }), 200
        else:
            return jsonify({
                'success': False, 
                'message': 'Failed to send message. Please try again.'
            }), 500
        
    except Exception as e:
        print(f"Error sending message: {str(e)}")
        return jsonify({
            'success': False, 
            'message': 'Failed to send message. Please try again later.'
        }), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    print("Make sure to set up your environment variable:")
    print("- WEB3FORM_ACCESS_KEY: Your Web3Form access key")
    app.run(debug=True, host='0.0.0.0', port=5000)
