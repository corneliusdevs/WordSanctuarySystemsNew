import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
    return (
        <div className="relative w-full h-screen">
            <Image
                src="/assets/heroImg.png"
                alt="Hero Image"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="w-full h-full"
            />
        </div>
    );
};

export default Hero;
