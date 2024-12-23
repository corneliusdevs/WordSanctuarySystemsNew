/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "via.placeholder.com",
            port:"", // leave empty for default ports
            pathname: "/**" // Allows all paths from the host name
        }]
    }
};

export default nextConfig;
