export const getRowColor = (type_operation: string) => {
    switch (type_operation) {
      case 'bce3696f-f930-447f-be5d-b8e87a47d627': // Приход
      case '8cc8f161-f8fd-4ebb-b808-f886d840d3a6': // Поступление
        return '#b5ff97'; // зеленый
      case '07feba80-03d6-4d7c-9c2e-a5bf80627a43': // Списание
        return '#f3ff97'; // желтый
      case '3032c839-8f27-4d76-a648-c8e0cb984694': // Расход
        return '#b9d8ff'; // синий
      default:
        return 'transparent'; // по умолчанию
    }
  };