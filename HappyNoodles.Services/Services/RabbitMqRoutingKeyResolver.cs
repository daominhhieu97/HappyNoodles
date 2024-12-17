using HappyNoodles.Models.Messages;

public class RabbitMqRoutingKeyResolver : IRoutingKeyResolver
{
    public string GetRoutingKey<T>(T message)
    {
        return message switch
        {
            OrderCreated => "order.created",
            InventoryLow => "inventory.low",
            _ => throw new InvalidOperationException($"No routing key defined for message type {typeof(T).Name}")
        };
    }
}
