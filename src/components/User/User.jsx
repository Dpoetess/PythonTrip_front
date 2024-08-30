import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css';
import UseApi from '../../services/useApi';
import { USER_DETAIL, PREFERENCES } from '../../config/urls';

function Profile() {
    const [user, setUser] = useState({
        username: '',
        name: '',
        lastname: '',
        email: ''
    });

    const [preferences, setPreferences] = useState({
        Beach: false,
        Mountain: false,
        Urban: false,
        Rural: false,
        Culture: false,
        Sport: false,
        Gastronomy: false
    });

    const { data: userData, loading: userLoading, error: userError } = UseApi({ apiEndpoint: USER_DETAIL });

    useEffect(() => {
        if (userData) {
            setUser({
                username: userData.username || '',
                name: userData.first_name || '',
                lastname: userData.last_name || '',
                email: userData.email || ''
            });

            setPreferences(prevPreferences => {
                const userPreferences = userData.preferences || [];
                return Object.keys(prevPreferences).reduce((acc, key) => ({
                    ...acc,
                    [key]: userPreferences.includes(key)
                }), {});
            });
        }
    }, [userData]);

    const handlePreferenceChange = (event) => {
        const { name, checked } = event.target;
        setPreferences(prevPreferences => ({
            ...prevPreferences,
            [name]: checked
        }));
    };

    const handleSavePreferences = () => {
        UseApi({
            apiEndpoint: PREFERENCES,
            method: 'POST',
            body: {
                preferences: Object.keys(preferences).filter(key => preferences[key])
            }
        }).then(() => alert('Preferences saved!'))
          .catch(err => console.error('Error saving preferences:', err));
    };

    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleSavedLocationsClick = () => {
        navigate('/savedlocations');
    };
    const handleMyItinerariesClick = () => {
        navigate('/itineraries');
    };
    if (userLoading) return <div>Loading...</div>;
    if (userError) return <div>Error loading data: {userError}</div>;

    return (
        <div className="profile-container">
            <div className="back-arrow" onClick={handleBackToHome}>
                <img src="/assets/icons/Arrow.svg" alt="Back to Home" className="arrow-icon" />
            </div>

            <h2 className="profile-title">Welcome, {user.username}</h2>
            <div className="settings-section">
                <div className="settings-info">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Last Name:</strong> {user.lastname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
            <div className="preferences-section">
                <h3>Preferences</h3>
                <div className="preferences-list">
                    {Object.keys(preferences).map(pref => (
                        <div className="preference-item" key={pref}>
                            <label>
                                <input
                                    type="checkbox"
                                    name={pref}
                                    checked={preferences[pref]}
                                    onChange={handlePreferenceChange}
                                />
                                {pref.charAt(0).toUpperCase() + pref.slice(1)}
                            </label>
                        </div>
                    ))}
                </div>
                <button onClick={handleSavePreferences} className="save-preferences-button">Save Preferences</button>
            </div>
            <div className="buttons-section">
                <button className="saved-locations-button" onClick={handleSavedLocationsClick}>
                    Saved Locations
                </button>
                <button className="my-collection-button">
                    My Collection
                </button>
                <button className="my-itineraries" onClick={handleMyItinerariesClick}>
                    My Itineraries
                </button>
            </div>
        </div>
    );
}

export default Profile;
