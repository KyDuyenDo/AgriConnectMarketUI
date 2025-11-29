import { Scissors, Bug, Droplets, Leaf, Sprout, Tractor, ThermometerSun, FlaskConical, Search } from 'lucide-react-native';

export const EVENT_ICONS: Record<string, any> = {
    'Harvest': Scissors,
    'Pest Control': Bug,
    'Watering': Droplets,
    'Fertilizing': Leaf,
    'Planting': Sprout,
    'Soil Preparation': Tractor,
    'Pruning': Scissors,
    'Monitoring': ThermometerSun,
    'Testing': FlaskConical,
    'Inspection': Search,
    'Weeding': Leaf, // Fallback or specific icon if available
    'Seeding': Sprout,
};

export const EVENT_COLORS: Record<string, { color: string, bg: string, iconColor: string }> = {

    // Let's standardize: 
    // bg: Background of the icon circle
    // iconColor: Color of the icon itself
    // color: Background of the timeline item (if needed, or just use white)

    // ActivityTimeline usage: iconBg (bg), iconColor (color)
    // TimelineList usage: color (bg), iconColor (iconColor)

    // I will define: bg (for icon background), iconColor (for icon tint)

    'Harvest': { bg: '#E8F9E6', iconColor: '#6BCF5F', color: '#FFF5EB' },
    'Pest Control': { bg: '#FEF5E7', iconColor: '#F39C12', color: '#FEF5E7' },
    'Watering': { bg: '#EBF5FB', iconColor: '#3498DB', color: '#EBF5FB' },
    'Fertilizing': { bg: '#E8F8E5', iconColor: '#7EC850', color: '#C8E6C9' },
    'Planting': { bg: '#E8F5E9', iconColor: '#4CAF50', color: '#E8F5E9' },
    'Soil Preparation': { bg: '#EFEBE9', iconColor: '#795548', color: '#EFEBE9' },
    'Pruning': { bg: '#FBE9E7', iconColor: '#FF5722', color: '#FBE9E7' },
    'Monitoring': { bg: '#F3E5F5', iconColor: '#9C27B0', color: '#F3E5F5' },
    'Testing': { bg: '#ECEFF1', iconColor: '#607D8B', color: '#ECEFF1' },
    'Inspection': { bg: '#E3F2FD', iconColor: '#2196F3', color: '#E3F2FD' },
    'Weeding': { bg: '#F1F8E9', iconColor: '#8BC34A', color: '#F1F8E9' },
    'Seeding': { bg: '#E8F5E9', iconColor: '#4CAF50', color: '#E8F5E9' },
};

export const getEventIconAndColor = (typeName: string) => {
    const Icon = EVENT_ICONS[typeName] || Leaf;
    const colors = EVENT_COLORS[typeName] || { bg: '#F5F5F5', iconColor: '#757575', color: '#F5F5F5' };
    return { Icon, ...colors };
};
