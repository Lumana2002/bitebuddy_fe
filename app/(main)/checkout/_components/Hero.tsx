import hero from '@/public/assets/hero.jpg'

const Hero = () => {
    return (
        <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url(${hero.src})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex items-center justify-center h-full mx-[20px] md:mx-[40px] 2xl:mx-[80px] my-2 max-md:flex-wrap">
                <div className="text-center text-white">
                    <h1 className="text-5xl font-bold text-secondary">Checkout Page</h1>
                    <p className="mt-4 text-4xl text-decoration-line: underline ">First Time?</p>
                </div>
            </div>
        </div>
    )
}

export default Hero
