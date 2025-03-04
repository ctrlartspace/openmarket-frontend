export default {
  semantic: {
    gray: {
      100: "#EDF1F3",
    },
    white: "#FFF",
    black: "#000000",
    form: {
      field: {
        border: {
          radius: "{border.radius.xl}",
        },
        padding: {
          y: "0.75rem",
          x: "1rem",
        },
      },
    },
    colorScheme: {
      light: {
        form: {
          field: {
            background: "{surface.0}", // Фон для светлой темы
            color: "{black}", // Цвет текста
            border: {
              radius: "{border.radius.xl}",
              color: "{gray.100}", // Граница
            },
            padding: {
              y: "0.75rem",
              x: "1rem",
            },
            shadow: "none",
            focus: {
              border: {
                color: "{gray.400}", // Граница при фокусе
              },
            },
            hover: {
              border: {
                color: "{gray.300}", // Граница при наведении
              },
            },
          },
          addon: {
            // Для дополнительных элементов (например, в InputGroup)
            background: "{gray.50}",
            color: "{gray.700}",
            border: {
              color: "{gray.100}",
            },
          },
        },
      },
      dark: {
        form: {
          field: {
            background: "{neutral.900}", // Темный фон для темной темы
            color: "{neutral.200}", // Светлый текст
            border: {
              radius: "{border.radius.xl}",
              color: "{black}", // Граница
            },
            padding: {
              y: "0.75rem",
              x: "1rem",
            },
            shadow: "none",
            focus: {
              border: {
                color: "{neutral.500}", // Граница при фокусе
              },
            },
            hover: {
              border: {
                color: "{neutral.700}", // Граница при наведении
              },
            },
          },
          addon: {
            // Для дополнительных элементов
            background: "{neutral.900}",
            color: "{neutral.200}",
            border: {
              color: "{neutral.700}",
            },
          },
        },
      },
    },
  },
  components: {
    button: {
      colorScheme: {
        light: {
          root: {
            primary: {
              font: {
                weight: "500",
              },
              color: "{black}",
              background: "{white}",
              border: {
                color: "{gray.100}",
              },
              hover: {
                color: "{black}",
                background: "{gray.50}",
                border: {
                  color: "{gray.200}",
                },
              },
              active: {
                color: "{black}",
                background: "{gray.50}",
                border: {
                  color: "{gray.300}",
                },
              },
            },

            secondary: {
              font: {
                weight: "500",
              },
              color: "{black}",
              background: "{gray.50}",
              border: {
                color: "{gray.50}",
              },
              hover: {
                color: "{black}",
                background: "{gray.100}",
                border: {
                  color: "{gray.200}",
                },
              },
              active: {
                color: "{black}",
                background: "{gray.100}",
                border: {
                  color: "{gray.300}",
                },
              },
            },
            danger: {
              font: {
                weight: "500",
              },
              color: "{red.600}",
              background: "{white}",
              border: {
                color: "{gray.100}",
              },
              hover: {
                color: "{red.600}",
                background: "{gray.50}",
                border: {
                  color: "{gray.200}",
                },
              },
              active: {
                color: "{red.600}",
                background: "{gray.50}",
                border: {
                  color: "{gray.300}",
                },
              },
            },

            help: {
              font: {
                weight: "500",
              },
              color: "{blue.600}",
              background: "{white}",
              border: {
                color: "{gray.100}",
              },
              hover: {
                color: "{blue.600}",
                background: "{gray.50}",
                border: {
                  color: "{gray.200}",
                },
              },
              active: {
                color: "{blue.600}",
                background: "{gray.50}",
                border: {
                  color: "{gray.300}",
                },
              },
            },

            contrast: {
              font: {
                weight: "500",
              },
              color: "{white}",
              background: "{black}",
              border: {
                color: "{black}",
              },
              hover: {
                color: "{white}",
                background: "{gray.900}",
                border: {
                  color: "{gray.900}",
                },
              },
              active: {
                color: "{white}",
                background: "{black}",
                border: {
                  color: "{black}",
                },
              },
            },
          },
        },
        dark: {
          root: {
            primary: {
              font: {
                weight: "500",
              },
              color: "{neutral.200}",
              background: "{black}",
              border: {
                color: "{neutral.800}",
              },
              hover: {
                color: "{neutral.200}",
                background: "{neutral.950}",
                border: {
                  color: "{neutral.800}",
                },
              },
              active: {
                color: "{neutral.200}",
                background: "{neutral.950}",
                border: {
                  color: "{neutral.700}",
                },
              },
            },

            secondary: {
              font: {
                weight: "500",
              },
              color: "{neutral.200}",
              background: "{neutral.800}",
              border: {
                color: "{neutral.800}",
              },
              hover: {
                color: "{neutral.200}",
                background: "{neutral.800}",
                border: {
                  color: "{neutral.700}",
                },
              },
              active: {
                color: "{neutral.200}",
                background: "{neutral.800}",
                border: {
                  color: "{neutral.700}",
                },
              },
            },
            danger: {
              font: {
                weight: "500",
              },
              color: "{red.400}",
              background: "{black}",
              border: {
                color: "{neutral.800}",
              },
              hover: {
                color: "{red.400}",
                background: "{neutral.950}",
                border: {
                  color: "{neutral.800}",
                },
              },
              active: {
                color: "{red.400}",
                background: "{neutral.950}",
                border: {
                  color: "{neutral.700}",
                },
              },
            },

            help: {
              font: {
                weight: "500",
              },
              color: "{blue.400}",
              background: "{black}",
              border: {
                color: "{neutral.800}",
              },
              hover: {
                color: "{blue.400}",
                background: "{neutral.950}",
                border: {
                  color: "{neutral.800}",
                },
              },
              active: {
                color: "{blue.400}",
                background: "{neutral.950}",
                border: {
                  color: "{neutral.700}",
                },
              },
            },

            contrast: {
              font: {
                weight: "500",
              },
              color: "{neutral.200}",
              background: "{black}",
              border: {
                color: "{black}",
              },
              hover: {
                color: "{neutral.200}",
                background: "{black}",
                border: {
                  color: "{black}",
                },
              },
              active: {
                color: "{neutral.200}",
                background: "{black}",
                border: {
                  color: "{black}",
                },
              },
            },
          },
        },
      },
    },

    multiselect: {
      colorScheme: {
        light: {
          root: {
            color: "{black}",
            shadow: "none",
            border: {
              color: "{gray.100}",
            },
            focus: {
              border: {
                color: "{gray.600}",
              },
            },
            hover: {
              border: {
                color: "{gray.300}",
              },
            },
          },
        },
      },
    },
    floatlabel: {
      colorScheme: {
        light: {
          root: {
            color: "{gray.300}",
            font: {
              weight: "medium",
            },
            focus: {
              color: "{gray.300}",
            },
            active: {
              color: "{gray.300}",
            },
          },
        },
      },
    },

    checkbox: {
      colorScheme: {
        light: {
          root: {
            border: {
              color: "{gray.300}",
            },
          },
        },
        dark: {
          root: {
            border: {
              color: "{neutral.700}",
            },
          },
        },
      },
    },

    message: {
      content: {
        padding: "0.75rem 1rem",
      },
      border: {
        width: "0",
        radius: "{border.radius.xl}",
      },
    },
  },
}
