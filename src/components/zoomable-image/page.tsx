import { useState } from 'react';

type ZoomableImageType = {
    src: string;
    alt: string;
}

function ZoomableImage({ src, alt }: ZoomableImageType) {
    const [backgroundPosition, setBackgroundPosition] = useState('center');
    const [isHovering, setIsHovering] = useState(false); // 👈 New state

    const handleMouseMove = (e: any) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setBackgroundPosition(`${x}% ${y}%`);
    };

    return (
        <div
            className="w-full object-cover rounded-lg min-[425px]:h-[458px] xl:h-[550px] min-[1600px]:h-[680px] min-[2560px]:h-[880px] border"
            style={{
                backgroundImage: `url(${src})`,
                backgroundPosition,
                backgroundSize: isHovering ? '200%' : '100%', // 👈 Zoom only on hover
                backgroundRepeat: 'no-repeat',
                transition: 'background-size 0.3s ease', // 👈 smooth zoom
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)} // 👈 start zoom
            onMouseLeave={() => {
                setBackgroundPosition('center');
                setIsHovering(false); // 👈 reset zoom
            }}
        >
            <img
                src={src}
                alt={alt}
                className="opacity-0 w-full h-full"
                draggable={false}
            />
        </div>
    );
}

export default ZoomableImage;
