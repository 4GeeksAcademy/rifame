# src/api/cloudinary_config.py
import cloudinary
import cloudinary.uploader
import os

# Configurar Cloudinary
cloudinary.config(
    cloud_name=os.environ.get('CLOUDINARY_CLOUD_NAME'),
    api_key=os.environ.get('CLOUDINARY_API_KEY'),
    api_secret=os.environ.get('CLOUDINARY_API_SECRET')
)

def upload_image(file, folder="rifas"):
    """
    Sube una imagen a Cloudinary
    
    Args:
        file: Archivo de imagen (FileStorage de Flask)
        folder: Carpeta en Cloudinary donde guardar la imagen
    
    Returns:
        dict: Información de la imagen subida (url, public_id, etc.)
    """
    try:
        result = cloudinary.uploader.upload(
            file,
            folder=folder,
            resource_type="auto",
            transformation=[
                {'width': 1000, 'height': 1000, 'crop': 'limit'},  # Limitar tamaño
                {'quality': 'auto:good'}  # Optimizar calidad
            ]
        )
        return {
            'success': True,
            'url': result['secure_url'],
            'public_id': result['public_id']
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def delete_image(public_id):
    """
    Elimina una imagen de Cloudinary
    
    Args:
        public_id: ID público de la imagen en Cloudinary
    
    Returns:
        dict: Resultado de la eliminación
    """
    try:
        result = cloudinary.uploader.destroy(public_id)
        return {'success': True, 'result': result}
    except Exception as e:
        return {'success': False, 'error': str(e)}