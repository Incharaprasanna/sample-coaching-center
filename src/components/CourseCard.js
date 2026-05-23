import Link from 'next/link';
import './CourseCard.css';
import { useState } from 'react';

export default function CourseCard({ title, duration, mode, cert, link, image, projects, technologies, classTimings, trainer }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(prev => !prev);

  return (
    <div className="course-card">
      {image && (
        <div className="course-card-image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="course-card-body">
        <h3 className="course-card-title">{title}</h3>
        <ul className="course-card-details">
          {duration && (
            <li>
              <span className="detail-icon">🕐</span>
              <span><strong>Duration:</strong> {duration}</span>
            </li>
          )}
          {mode && (
            <li>
              <span className="detail-icon">📍</span>
              <span><strong>Mode:</strong> {mode}</span>
            </li>
          )}
          {cert && (
            <li>
              <span className="detail-icon">🎓</span>
              <span><strong>Certificate:</strong> {cert}</span>
            </li>
          )}
        </ul>
        {/* Extra details hidden until toggle */}
        {showDetails && (
          <ul className="course-card-extra">
            {projects && <li><strong>Projects:</strong> {projects}</li>}
            {technologies && <li><strong>Technologies:</strong> {technologies}</li>}
            {classTimings && <li><strong>Class Timings:</strong> {classTimings}</li>}
            {trainer && <li><strong>Trainer:</strong> {trainer}</li>}
          </ul>
        )}
        {/* Button to toggle details */}
        <button className="course-card-btn" onClick={toggleDetails}>
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
      </div>
    </div>
  );
}
