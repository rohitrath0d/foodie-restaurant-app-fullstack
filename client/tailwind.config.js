/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",	
  ],

	prefix: "",
	theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			},
    			coral: {
    				light: '#FF8F8F',
    				DEFAULT: '#FF6B6B',
    				dark: '#E55858'
    			},
    			mint: {
    				light: '#F8FFFC',
    				DEFAULT: '#F1FAF6',
    				dark: '#D7EBE0'
    			},
    			navy: {
    				light: '#2A2F5C',
    				DEFAULT: '#1A1E3F',
    				dark: '#0E1129'
    			},
    			mustard: {
    				light: '#FFCB42',
    				DEFAULT: '#FFB400',
    				dark: '#E09D00'
    			},
    			'restaurant-softRed': '#FF6B6B'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			'pulse-soft': {
    				'0%, 100%': {
    					opacity: '1'
    				},
    				'50%': {
    					opacity: '0.7'
    				}
    			},
    			shimmer: {
    				'0%': {
    					backgroundPosition: '-468px 0'
    				},
    				'100%': {
    					backgroundPosition: '468px 0'
    				}
    			},
    			'bounce-small': {
    				'0%, 100%': {
    					transform: 'translateY(0)'
    				},
    				'50%': {
    					transform: 'translateY(-4px)'
    				}
    			},
    			'scale-in': {
    				'0%': {
    					transform: 'scale(0.95)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'scale(1)',
    					opacity: '1'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0)'
    				},
    				'50%': {
    					transform: 'translateY(-5px)'
    				}
    			},
    			'slide-up': {
    				from: {
    					transform: 'translateY(10px)',
    					opacity: '0'
    				},
    				to: {
    					transform: 'translateY(0)',
    					opacity: '1'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'pulse-soft': 'pulse-soft 2s infinite',
    			shimmer: 'shimmer 1.5s infinite linear',
    			'bounce-small': 'bounce-small 0.5s ease-in-out',
    			'scale-in': 'scale-in 0.2s ease-out',
    			float: 'float 3s ease-in-out infinite',
    			'slide-up': 'slide-up 0.3s ease-out'
    		},
    		backgroundImage: {
    			'shimmer-gradient': 'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
    			'coral-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #FF8F8F 100%)',
    			'mint-gradient': 'linear-gradient(135deg, #F1FAF6 0%, #D7EBE0 100%)',
    			'navy-gradient': 'linear-gradient(135deg, #1A1E3F 0%, #2A2F5C 100%)',
    			'mustard-gradient': 'linear-gradient(135deg, #FFB400 0%, #FFCB42 100%)'
    		},
    		boxShadow: {
    			soft: '0 4px 12px rgba(0, 0, 0, 0.05)',
    			card: '0 6px 16px rgba(0, 0, 0, 0.08)'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
}