import { motion } from 'framer-motion';

export default function GlobalLoader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-dark-950"
        >
            <div className="relative flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="w-32 h-32 flex items-center justify-center mb-6"
                >
                    <img src="/logo.png" alt="Milliy Brend Reklama" className="w-full h-full object-contain" />
                </motion.div>

                {/* Loading Bar */}
                <div className="w-48 h-1 bg-dark-100 dark:bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-full h-full bg-primary-500 rounded-full"
                    />
                </div>
            </div>
        </motion.div>
    );
}
