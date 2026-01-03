import { NextResponse } from 'next/server';

// Interface for the API response structure
interface VersionResponse {
    latestVersionCode: number;
    latestVersionName: string;
    apkUrl: string;
    forceUpdate: boolean;
    message: string;
}

// Default configuration constants acting as fallbacks
// Hardcoded configuration for app versioning
// Update these values directly to release a new version
const APP_CONFIG = {
    latestVersionCode: 1, // Integer: Compare with Android versionCode
    latestVersionName: '1.0.0', // String: Display name
    apkUrl: 'https://news.shubh9580.com/downloads/app-release.apk',
    forceUpdate: false, // Set to true to block app usage until updated
    message: 'A new version is available. Please update for the best experience.',
};

export const dynamic = 'force-dynamic'; // Ensure the route is never statically cached
export const revalidate = 0; // Disable revalidation

export async function GET(): Promise<NextResponse<VersionResponse | { error: string }>> {
    try {
        const responseData: VersionResponse = {
            latestVersionCode: APP_CONFIG.latestVersionCode,
            latestVersionName: APP_CONFIG.latestVersionName,
            apkUrl: APP_CONFIG.apkUrl,
            forceUpdate: APP_CONFIG.forceUpdate,
            message: APP_CONFIG.message,
        };

        return NextResponse.json(responseData, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });

    } catch (error) {
        console.error('API Error in app-version:', error);
        // Return a safe fallback so the app doesn't crash on check
        return NextResponse.json(
            {
                latestVersionCode: APP_CONFIG.latestVersionCode,
                latestVersionName: APP_CONFIG.latestVersionName,
                apkUrl: APP_CONFIG.apkUrl,
                forceUpdate: false,
                message: 'Unable to fetch version info',
            },
            { status: 200 } // Return 200 even on error to prevent client network error handling issues
        );
    }
}
