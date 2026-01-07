from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
from io import BytesIO
from datetime import datetime

def generate_certificate(user_name: str, email: str, test_name: str, score: float, completed_at: str) -> BytesIO:
    """Generate a simple INDX1000 certificate"""
    
    buffer = BytesIO()
    
    # Create PDF in landscape mode
    c = canvas.Canvas(buffer, pagesize=landscape(A4))
    width, height = landscape(A4)
    
    # Draw border
    c.setStrokeColor(colors.HexColor('#050E3C'))
    c.setLineWidth(3)
    c.rect(30, 30, width - 60, height - 60, stroke=1, fill=0)
    
    # Inner border
    c.setLineWidth(1)
    c.rect(40, 40, width - 80, height - 80, stroke=1, fill=0)
    
    # Title
    c.setFont("Helvetica-Bold", 40)
    c.setFillColor(colors.HexColor('#050E3C'))
    c.drawCentredString(width / 2, height - 100, "INDX1000")
    
    # Certificate of completion
    c.setFont("Helvetica", 18)
    c.setFillColor(colors.black)
    c.drawCentredString(width / 2, height - 140, "Certificate of Completion")
    
    # Divider line
    c.setStrokeColor(colors.HexColor('#050E3C'))
    c.setLineWidth(2)
    c.line(width / 2 - 150, height - 155, width / 2 + 150, height - 155)
    
    # This certifies that
    c.setFont("Helvetica", 14)
    c.drawCentredString(width / 2, height - 200, "This certifies that")
    
    # User Name (Large)
    c.setFont("Helvetica-Bold", 28)
    c.setFillColor(colors.HexColor('#050E3C'))
    c.drawCentredString(width / 2, height - 240, user_name)
    
    # Email
    c.setFont("Helvetica", 12)
    c.setFillColor(colors.grey)
    c.drawCentredString(width / 2, height - 265, email)
    
    # Has successfully completed
    c.setFont("Helvetica", 14)
    c.setFillColor(colors.black)
    c.drawCentredString(width / 2, height - 310, "has successfully completed")
    
    # Test Name
    c.setFont("Helvetica-Bold", 18)
    c.setFillColor(colors.HexColor('#050E3C'))
    c.drawCentredString(width / 2, height - 345, test_name)
    
    # Score Section
    c.setFont("Helvetica", 14)
    c.setFillColor(colors.black)
    c.drawCentredString(width / 2, height - 390, "with an INDX score of")
    
    # Score (Large and Bold)
    c.setFont("Helvetica-Bold", 32)
    c.setFillColor(colors.HexColor('#050E3C'))
    c.drawCentredString(width / 2, height - 430, f"{int(score)} / 1000")
    
    # Date
    c.setFont("Helvetica", 12)
    c.setFillColor(colors.grey)
    date_str = datetime.fromisoformat(completed_at.replace('Z', '+00:00')).strftime("%B %d, %Y")
    c.drawCentredString(width / 2, 80, f"Date of Completion: {date_str}")
    
    # Footer
    c.setFont("Helvetica-Oblique", 10)
    c.setFillColor(colors.grey)
    c.drawCentredString(width / 2, 50, "INDX1000 - Cognitive Interaction Assessment")
    
    c.save()
    buffer.seek(0)
    return buffer