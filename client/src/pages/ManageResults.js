import React from 'react';

const ManageResults = () => {
    return (
        <div className="section-card">
            <div className="section-header">
                <h3 className="section-title">Manage Examination Results</h3>
            </div>
            <form className="form-section">
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>Search Student (Email or Roll ID)</label>
                        <input type="text" placeholder="Type to search..." />
                    </div>
                    <div className="form-group">
                        <label>Subject</label>
                        <input type="text" placeholder="e.g. Mathematics" />
                    </div>
                    <div className="form-group">
                        <label>Obtained Marks</label>
                        <input type="number" placeholder="0-100" />
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Publish Result</button>
                </div>
            </form>
        </div>
    );
};

export default ManageResults;