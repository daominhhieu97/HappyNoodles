using HappyNoodles.Services.Interfaces;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace HappyNoodles.Services.Services
{
    public class JsonService : IJsonService
    {
        private readonly JsonSerializerOptions _options;

        public JsonService()
        {
            _options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                PropertyNameCaseInsensitive = true,
                Converters = { new JsonStringEnumConverter() }
            };
        }

        public string Serialize<T>(T obj)
        {
            try
            {
                return JsonSerializer.Serialize(obj, _options);
            }
            catch (JsonException ex)
            {
                throw new SerializationException($"Failed to serialize object of type {typeof(T).Name}", ex);
            }
        }

        public T Deserialize<T>(string json)
        {
            if (string.IsNullOrEmpty(json))
            {
                throw new ArgumentNullException(nameof(json));
            }

            try
            {
                return JsonSerializer.Deserialize<T>(json, _options);
            }
            catch (JsonException ex)
            {
                throw new SerializationException($"Failed to deserialize JSON to type {typeof(T).Name}", ex);
            }
        }

        public async Task<string> SerializeAsync<T>(T obj)
        {
            using var stream = new MemoryStream();
            await JsonSerializer.SerializeAsync(stream, obj, _options);
            stream.Position = 0;
            using var reader = new StreamReader(stream);
            return await reader.ReadToEndAsync();
        }

        public async Task<T> DeserializeAsync<T>(string json)
        {
            if (string.IsNullOrEmpty(json))
            {
                throw new ArgumentNullException(nameof(json));
            }

            try
            {
                using var stream = new MemoryStream(Encoding.UTF8.GetBytes(json));
                return await JsonSerializer.DeserializeAsync<T>(stream, _options);
            }
            catch (JsonException ex)
            {
                throw new SerializationException($"Failed to deserialize JSON to type {typeof(T).Name}", ex);
            }
        }
    }
}
