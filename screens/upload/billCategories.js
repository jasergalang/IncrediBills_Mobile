import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
    {
        id: 'electricity',
        name: 'Electricity',
        icon: '⚡',
        color: '#FDB022',
        description: 'Track current and see your monthly expenses',
    },
    {
        id: 'water',
        name: 'Water',
        icon: '💧',
        color: '#4A9FD8',
        description: 'Track current and see your monthly expenses',
    },
    {
        id: 'lpg',
        name: 'LPG',
        icon: '🔥',
        color: '#FF6B6B',
        description: 'Track current and see your monthly expenses',
    },
    {
        id: 'fuel',
        name: 'Fuel',
        icon: '⛽',
        color: '#DC3545',
        description: 'Track current and see your monthly expenses',
    },
    {
        id: 'grocery',
        name: 'Grocery',
        icon: '🛒',
        color: '#A8D5BA',
        description: 'Track current and see your monthly expenses',
    },
];

const recentUploads = [
    { id: 1, type: 'Water Bill', image: require('../../assets/images/incredibills_logo.png') },
    { id: 2, type: 'Grocery Bill', image: require('../../assets/images/incredibills_logo.png') },
];

export default function BillCategories({ navigation }) {
    const handleCategoryPress = (category) => {
        navigation.navigate('UploadBill', { category });
    };

    const CategoryCard = ({ category }) => (
        <TouchableOpacity
            style={[styles.categoryCard, { backgroundColor: category.color }]}
            onPress={() => handleCategoryPress(category)}
            activeOpacity={0.8}
        >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryName}>{category.name}</Text>
            <Text style={styles.categoryDescription}>{category.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Upload Your Bills</Text>
                    <Text style={styles.subtitle}>
                        Kindly upload your bills according to the appropriate category
                    </Text>
                </View>

                <View style={styles.categoriesGrid}>
                    <View style={styles.row}>
                        <CategoryCard category={categories[0]} />
                        <CategoryCard category={categories[1]} />
                    </View>
                    <View style={styles.row}>
                        <CategoryCard category={categories[2]} />
                        <CategoryCard category={categories[3]} />
                    </View>
                    <View style={styles.row}>
                        <CategoryCard category={categories[4]} />
                        <View style={styles.categoryCard} />
                    </View>
                </View>

                <View style={styles.recentSection}>
                    <Text style={styles.recentTitle}>Recent Upload</Text>
                    {recentUploads.map((item) => (
                        <View key={item.id} style={styles.recentItem}>
                            <View style={styles.recentLeft}>
                                <Image source={item.image} style={styles.recentImage} />
                                <Text style={styles.recentText}>{item.type}</Text>
                            </View>
                            <TouchableOpacity style={styles.viewButton}>
                                <Text style={styles.viewButtonText}>View Details</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollContent: {
        padding: 20,
        // paddingTop: 60,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    categoriesGrid: {
        marginBottom: 32,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    categoryCard: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 16,
        padding: 16,
        justifyContent: 'space-between',
    },
    categoryIcon: {
        fontSize: 36,
    },
    categoryName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 4,
    },
    categoryDescription: {
        fontSize: 11,
        color: '#FFF',
        opacity: 0.9,
        lineHeight: 14,
    },
    recentSection: {
        // marginTop: 8,
    },
    recentTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        marginBottom: 16,
    },
    recentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    recentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
    },
    recentText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000',
    },
    viewButton: {
        backgroundColor: '#999',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    viewButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '500',
    },
});