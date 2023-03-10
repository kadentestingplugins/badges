import { useState } from "react";

interface BadgeSettingsProps {
  badges: Badge[];
  onSave: (badges: Badge[]) => void;
}

interface Badge {
  name: string;
  enabled: boolean;
  url: string | null;
}

export default function BadgeSettings(props: BadgeSettingsProps) {
  const [badges, setBadges] = useState(props.badges);

  const handleToggleBadge = (badgeName: string) => {
    const newBadges = badges.map((badge) => {
      if (badge.name === badgeName) {
        return { ...badge, enabled: !badge.enabled };
      } else {
        return badge;
      }
    });
    setBadges(newBadges);
  };

  const handleBadgeUrlChange = (badgeName: string, url: string) => {
    const newBadges = badges.map((badge) => {
      if (badge.name === badgeName) {
        return { ...badge, url: url };
      } else {
        return badge;
      }
    });
    setBadges(newBadges);
  };

  const handleSave = () => {
    props.onSave(badges);
  };

  return (
    <div>
      <h2>Badge Settings</h2>
      {badges.map((badge) => (
        <div key={badge.name}>
          <label>
            <input
              type="checkbox"
              checked={badge.enabled}
              onChange={() => handleToggleBadge(badge.name)}
            />
            {badge.name}
          </label>
          {badge.enabled && (
            <div>
              <label>
                Custom URL:
                <input
                  type="text"
                  value={badge.url || ""}
                  onChange={(e) => handleBadgeUrlChange(badge.name, e.target.value)}
                />
              </label>
            </div>
          )}
        </div>
      ))}
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
